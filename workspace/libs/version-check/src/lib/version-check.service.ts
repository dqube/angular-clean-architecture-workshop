import { Injectable } from '@angular/core';
import { VersionInfo } from '@buildmotion/common';
import { AppEnvironment, ConfigurationService, IAppVersionConfig } from '@buildmotion/configuration';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { LoggingService, Severity } from '@buildmotion/logging';
import { noop, Observable, ReplaySubject } from 'rxjs';
import { ApplicationInfo } from './application-info.model';
import { BusinessProviderService } from './business/business-provider.service';
import { LocalStorageHelper } from './local-storage-helper';

/**
 * Use to manage version check for the application. This service provides the functionality
 * to reload the application when it is determined that the current version does not match
 * the version information from the Live API service.
 */

export interface IVersionCheckService {
  versionConfig?: IAppVersionConfig;
  forceReload: boolean;
  version$: Observable<string>;
  isAppReloadRequired$: Observable<boolean>;
  reloadDelayInMinutes: number;
  reloadOnDemand(): void;
}

@Injectable({
  providedIn: 'root',
})
export class VersionCheckService extends ServiceBase implements IVersionCheckService {
  versionConfig?: IAppVersionConfig;
  forceReload = true;
  private reloadRequested = false;

  // 1. USE THE FOLLOWING TO DISPLAY VERSION INFORMATION;
  private versionInfo?: VersionInfo;
  private versionSubject: ReplaySubject<string> = new ReplaySubject<string>(1);
  public readonly version$: Observable<string> = this.versionSubject.asObservable();

  // 2. USE THE FOLLOWING TO INDICATE IF A APPLICATION RELOAD IS REQUIRED
  private isAppReloadRequired = false;
  private isAppReloadRequiredSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public readonly isAppReloadRequired$: Observable<boolean> = this.isAppReloadRequiredSubject.asObservable();
  reloadDelayInMinutes = 5;//default if not provided by the configuration;

  constructor(
    private configService: ConfigurationService,
    private businessProvider: BusinessProviderService,
    private versionContext: VersionInfo,
    loggingService: LoggingService,
    serviceContext: ServiceContext
  ) {
    super('VersionCheckService', loggingService, serviceContext);
    this.initializeService();
  }

  /**
 * Use to initialize the [versionInfo] from the compiled version of the application bundles.
 *
 * The [versionInfo] information comes from the [version-info.json or version-info.ts] file that is injected
 * into the application during the production build.
 */
  private initializeService() {
    try {
      this.businessProvider.serviceContext = this.serviceContext;

      this.loggingService.log(this.serviceName, Severity.Information, `Retrieving application version information.`);
      this.versionConfig = this.configService.settings.version;
      this.versionInfo = new VersionInfo(this.versionContext.application, this.versionContext.version, this.versionContext.buildDate, this.versionContext.hash);
      this.isAppReloadRequiredSubject.next(false);
      this.versionSubject.next(this.versionInfo.version);

      this.loggingService.log(this.serviceName, Severity.Information, `Preparing to retrieve application information.`);
      this.businessProvider.retrieveApplicationInfo<ApplicationInfo>().subscribe(
        (response) => { this.handleVersionUpdate(response); },
        error => this.handleRetrieveApplicationInfoError(error),
        () => this.finishRequest(this.serviceName)
      );

      this.reloadDelayInMinutes = this.configService.settings.webConfig.reloadDelayAfterNoticeInMinutes;
    } catch (error) {
      this.logError(error, `Failure while attempting to subscribe to the [versionUpdate$] live service.`);
    }
  }

  /**
   * Use to determine if the application should reload on startup/initialization. The
   * application will require a reload if the last [app onStart] reload is more than
   * 24 hours.
   */
  reloadOnDemand() {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process request to reload the application on-demand.`);
    // attempt to retrieve last application reload date;
    const lastReloadDate = LocalStorageHelper.appOnStartReloadUTCDate;
    const now = new Date();

    if (lastReloadDate) {
      this.loggingService.log(this.serviceName, Severity.Information, `The application was last re-loaded on ${lastReloadDate.toUTCString()}.`);

      // use the [last app reload date] to determine if a reload has occurred recently - perform only once within 24 hours?
      const hoursDifference: number = Math.abs(now.getTime() - lastReloadDate.getTime()) / 3600000;
      if (hoursDifference >= 2) {
        this.loggingService.log(this.serviceName, Severity.Information, `The last application reload was [${hoursDifference}] hours ago.`);

        LocalStorageHelper.appOnStartReloadUTCDate = now;
        this.isAppReloadRequired = true; //enables a by-pass to perform reload without [update] event
        this.reloadApplication(0); //immediate reload
      } else {
        this.loggingService.log(
          this.serviceName,
          Severity.Information,
          `An application reload was performed within the last 24 hours - no reload required at this time.`
        );
      }
    } else {
      // there is no last reload date --> perform reload;
      this.loggingService.log(this.serviceName, Severity.Information, `There is no history of an application reload - reloading immediately.`);

      // add now date to the user preference storage to determine if/when the application has reloaded on start...
      LocalStorageHelper.appOnStartReloadUTCDate = now;
      this.isAppReloadRequired = true; //enables a by-pass to perform reload without LiveUpdate event
      this.reloadApplication(0); //immediate reload with no delay time in minutes.
    }
  }

  /**
   * Use to reload the application using the specified delay in minutes. This will perform
   * a single/one-time reload after the elapsed time of the specified delay.
   *
   * After the reload, the application will have a new [version.json] that contains
   * the latest version number for the application.
   *
   * @param delayInMinutes
   */
  private reloadApplication(delayInMinutes = 10) {
    if (this.isAppReloadRequired) {
      this.loggingService.log(this.serviceName, Severity.Information, `Preparing to reload the application in ${delayInMinutes} minutes.`);
      this.reloadRequested = true;
      setTimeout(() => {
        location.reload(true); //--> MAGIC HAPPENS HERE;)
        LocalStorageHelper.appOnStartReloadUTCDate = new Date();
      }, delayInMinutes * 60 * 1000); //minutes * seconds * milliseconds
    }
  }

  private handleRetrieveApplicationInfoError(error: any): void {
    if (error instanceof Error) {
      this.logError(error, `Failure while attempting to retrieve application information.`);
    }
  }

  /**
   * Use to handle any updates to the application version.
   *
   * @param applicationInfo An updated value from the live service.
   */
  private handleVersionUpdate(response: any) {
    try {
      this.loggingService.log(this.serviceName, Severity.Information, `Preparing to handle application information update.`);
      if (response && response.body && response.body.isSuccess) {
        const applicationInfo = response.body.data;
        if (applicationInfo && applicationInfo.version) {
          if (applicationInfo.version.length > 0 && this.isVersionUpdate(applicationInfo.version)) {
            this.loggingService.log(this.serviceName, Severity.Information, `Broadcast to subscribers that an application update is required.`);
            /**
             * 1. The [isAppReloadRequiredSubject] indicator is initialized to [false] (when the application is reloaded;
             * the default value is always [false]); until there is a server event that indicates otherwise.
             *
             * 2. only indicate required reloads in [specified] environments.
             */
            if (this.allowReloadByEnvironment()) {
              this.isAppReloadRequiredSubject.next(true); //broadcast that an application update is required.
              this.reloadApplication(this.reloadDelayInMinutes);
            }
          }
        } else {
          this.loggingService.log(this.serviceName, Severity.Error, `Failed to retrieve application information.`);
        }
      }
    } catch (error) {
      this.logError(error, `Failure while handling application version update notification.`);
    }
  }

  /**
   * Use to determine if a version reload is allowed by the current environment.
   */
  private allowReloadByEnvironment(): boolean {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to determine if environment allows application reload`);
    let isAllowed = false;
    if (
      (this.versionConfig && this.versionConfig.displayNotification && this.versionConfig.environment === AppEnvironment.production) ||
      this.versionConfig?.environment === AppEnvironment.stage
    ) {
      this.loggingService.log(this.serviceName, Severity.Information, `Environment allows application reload: true`);
      isAllowed = true;
    }
    return isAllowed;
  }

  /**
   * Will do the call and check if the version has changed or not
   * @param updatedVersion: The version from the live update service.
   */
  private isVersionUpdate(updatedVersion: string): boolean {
    let isVersionUpdated = false;
    try {
      this.loggingService.log(this.serviceName, Severity.Information, `Preparing to compare application and server version information.`);
      if (this.versionInfo && this.versionInfo.version && this.versionInfo.version.length > 0) {
        if (this.versionInfo.version !== updatedVersion) {
          this.loggingService.log(
            this.serviceName,
            Severity.Information,
            `New application version is available. Enable update from version [${this.versionInfo.version}] to [${updatedVersion}].`
          );
          this.isAppReloadRequired = true;
          return (isVersionUpdated = true);
        } else {
          this.loggingService.log(
            this.serviceName,
            Severity.Information,
            `The application contains the same version as the server - no updates required at this time.`
          );
        }
      } else {
        this.loggingService.log(this.serviceName, Severity.Warning, `Unable to check for application version.`);
      }
    } catch (error) {
      this.logError(error, `Failure while attempting to compare server/application version information.`);
    }
    return isVersionUpdated;
  }

  /**
   * Use to indicate if the application requires a reload. The value will
   * be true if the runtime version is different from the current release version (server).
   */
  get isReloadRequired(): boolean {
    return this.isAppReloadRequired;
  }

  /**
   * Use to determine if a request to reload has been initiated. Request will fulfill
   * after the delay in minutes is fulfilled.
   */
  get isReloadRequested(): boolean {
    return this.reloadRequested;
  }
}

export class VersionCheckServiceMock implements IVersionCheckService {
  versionConfig?: IAppVersionConfig;
  forceReload: boolean;
  version$: Observable<string>;
  isAppReloadRequired$: Observable<boolean>;
  reloadDelayInMinutes: number;

  reloadOnDemand(): void {
    noop();
  }

}
