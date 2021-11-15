import { Injectable, Optional } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConfigurationService } from '@buildmotion/configuration';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation'
import { LoggingService, Severity } from '@buildmotion/logging';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatomoService extends ServiceBase {

  constructor(
    @Optional() public configService: ConfigurationService,
    private router: Router,
    loggingService: LoggingService,
    serviceContext: ServiceContext) {
    super('MatomoService', loggingService, serviceContext)
    this.initializeMatomoAnalytics();
  }

  /**
   * Use to initialize [Matomo] analytics script
   */
  public initializeMatomoAnalytics() {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to initialize [Matomo] analytics.`);

    this.configService.settings$.subscribe(() => {
      this.loadMatomoScript();
    })
  }

  private manageRouteEvents() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.analyticsPageView(event);
    });
  }

  /**
 * Use to track a distinct/unique page view for the application.
 * @param event
 */
  private analyticsPageView(event: NavigationEnd) {
    if (event && event.urlAfterRedirects) {
      this.loggingService.log(this.serviceName, Severity.Information, `Preparing to set [Analytics] page view for [${event.urlAfterRedirects}].`);
      const currentUrl = location.href;
      if (window && window._paq) {
        const _paq = window._paq = window._paq || [];

        _paq.push(['setReferrerUrl', currentUrl]);
        // currentUrl = '/' + window.location.hash.substr(1);
        _paq.push(['setCustomUrl', currentUrl]);
        _paq.push(['setDocumentTitle', window.document.title]);

        _paq.push(['deleteCustomVariables', 'page']);
        _paq.push(['trackPageView']);

        // make Matomo aware of newly added content
        const content = document.getElementById('content');
        _paq.push(['MediaAnalytics::scanForMedia', content]);
        _paq.push(['FormAnalytics::scanForForms', content]);
        _paq.push(['trackContentImpressionsWithinNode', content]);
        _paq.push(['enableLinkTracking']);
      }

    } else {
      this.loggingService.log(this.serviceName, Severity.Warning, `Failed to set [Analytics] page view.`);
    }
  }

  /**
   * Loads (i.e., injects) the script into the application DOM.
   */
  private loadMatomoScript() {
    try {
      if (this.configService && this.configService.config && this.configService.config.matomoConfig) {
        if (this.configService.config.matomoConfig.enabled) {
          // LOAD THE PAYLOAD
          this.loggingService.log(this.serviceName, Severity.Information, `Preparing to inject [Matomo] script into document.`);
          const script = this.configService.config.matomoConfig.script;

          const scriptElement = document.createElement('script');
          scriptElement.async = true;
          scriptElement.innerText = script;

          document.head.insertBefore(scriptElement, document.head.childNodes[0]);

          this.manageRouteEvents();
        }
      }
    } catch (error) {
      this.logError(error, `Failed to load the [Matomo] script.`);
    }
  }
}
