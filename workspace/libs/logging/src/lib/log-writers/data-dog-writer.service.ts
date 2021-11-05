import { Injectable, Optional } from '@angular/core';
import { ConfigurationService, IConfiguration, IDataDogConfig } from '@buildmotion/configuration';
import { ILogEntry } from '../i-log-entry';
import { LoggingService } from '../logging.service';
import { LogWriter } from './log-writer';
import { datadogLogs } from '@datadog/browser-logs';
import { Severity } from '../severity.enum';
import { datadogRum } from '@datadog/browser-rum';

@Injectable({
  providedIn: 'root'
})
export class DataDogWriterService extends LogWriter {
  config: IDataDogConfig | undefined;

  constructor(
    @Optional() private configService: ConfigurationService,
    private loggingService: LoggingService,
  ) {
    super();
    if (this.configService && this.loggingService) {
      this.configService.settings$.subscribe((settings) =>
        this.handleSettings(settings)
      );
      this.loggingService.logEntries$.subscribe((entry) =>
        this.handleLogEntry(entry)
      );
    }
  }

  handleLogEntry(entry: ILogEntry) {
    if (this.hasWriter) {
      this.targetEntry = entry;
      this.execute();
    }
  }

  handleSettings(settings: IConfiguration) {
    if (settings) {
      this.config = settings.dataDogConfig;
      this.hasWriter = true;
      console.log(`Initializing [DataDog] writer for logging.`);

      /**
       * Use to initialize client-browser log transfer to DataDog;
       */
      datadogLogs.init({
        clientToken: this.config.logs.clientToken,
        site: this.config.logs.site,
        forwardErrorsToLogs: this.config.logs.forwardErrorsToLogs,
        sampleRate: this.config.logs.sampleRate
      });

      /**
       * Note: The trackInteractions initialization parameter enables the automatic collection of user
       * clicks in your application.Sensitive and private data contained on your pages may be included to
       * identify the elements interacted with.
       *
       * version: Specify a version number to identify the deployed version of your application in Datadog
       */
      datadogRum.init({
        applicationId: this.config.realUserMonitoring.applicationId,
        clientToken: this.config.realUserMonitoring.clientToken,
        site: this.config.realUserMonitoring.site,
        service: this.config.realUserMonitoring.service,
        env: this.config.realUserMonitoring.env,
        // Specify a version number to identify the deployed version of your application in Datadog
        version: this.config.realUserMonitoring.version,
        sampleRate: this.config.realUserMonitoring.sampleRate,
        trackInteractions: this.config.realUserMonitoring.trackInteractions
      });
    }
  }

  /**
   * Use to perform an setup or configuration of the [writer].
   * The [setup] method runs on all executions of the writer - and
   * is called before the [write] method.
   */
  public setup(): void {
    if (this.hasWriter && this.config && this.targetEntry) {
      try {
        // FIXME: DO WE NEED TO SOMETHING HERE?
      } catch (error) {
        const message = `${this.targetEntry.application}.DataDogWriter: ${{
          ...error,
        }}`;
        console.error(message);
      }
    }
  }

  /**
   * Use to implement the actual write of the [Log Entry].
   */
  public write(): void {
    if (this.targetEntry) {
      switch (this.targetEntry.severity) {
        case Severity.Information:
          datadogLogs.logger.info(this.targetEntry.application, { ...this.targetEntry });
          break;
        case Severity.Warning:
          datadogLogs.logger.warn(this.targetEntry.application, { ...this.targetEntry });
          break;
        case Severity.Error:
          datadogLogs.logger.error(this.targetEntry.application, { ...this.targetEntry });
          break;
        case Severity.Critical:
          datadogLogs.logger.error(this.targetEntry.application, { ...this.targetEntry });
          break;
        case Severity.Debug:
          datadogLogs.logger.info(this.targetEntry.application, { ...this.targetEntry });
          break;
        default:
          datadogLogs.logger.info(this.targetEntry.application, { ...this.targetEntry });
      }
    }
  }

}
