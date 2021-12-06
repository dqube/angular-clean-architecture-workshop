import { IConfiguration } from '@buildmotion/configuration';
import { AppEnvironment } from '@buildmotion/configuration';

export const AppConfig: IConfiguration = {
  apiConfig: {
    baseUrl: 'http://localhost:3333/api',
    health: 'https://api.buildmotion.io/v1/dev/health',
    csrf: '',
    security: '',
    version: 'http://localhost:3333/api',
  },
  dataDogConfig: {
    logs: {
      clientToken: 'pubf2f47da2fa52a961e47224aed1935e62',
      forwardErrorsToLogs: true,
      sampleRate: 100,
      site: 'datadoghq.com'
    },
    realUserMonitoring: {
      applicationId: 'aec645ca-5972-4168-8ffc-f8674bf7c33f',
      clientToken: 'pubf2f47da2fa52a961e47224aed1935e62',
      site: 'datadoghq.com',
      service: 'portal360nonprod',
      env: 'non-prod',
      version: '1.0.0',
      sampleRate: 100,
      trackInteractions: true
    },
  },
  loggingConfig: {
    applicationName: 'Dashboard',
    isProduction: false,
  },
  errorHandlingConfig: {
    applicationName: 'Dashboard',
    includeDefaultErrorHandling: true,
  },
  matomoConfig: {
    url: 'https://tacolife.matomo.cloud/',
    siteId: '1',
    enabled: true,
    script: `var _paq = window._paq = window._paq || [];
      _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
      _paq.push(["setCookieDomain", "*.www.taco-life.com"]);
      _paq.push(["setDoNotTrack", true]);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="https://tacolife.matomo.cloud/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.src='//cdn.matomo.cloud/tacolife.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
      })();`
  },
  webConfig: {
    applicationName: 'Dashboard',
    blogURL: '',
    companyName: 'Dashboard',
    companyEffectiveDate: new Date(2020, 10, 1),
    email: 'info@builmotion.io',
    social: {
      instagram: {
        name: 'Dashboard',
        URL: '',
      },
      twitter: { name: '', URL: '' },
    },
    version: '1.0.0',
    website: 'dashboard',
    defaultPageSize: 25,
    googleTagManagerId: 'GTM-1234',
    keywordValidationInMilliseconds: 750,
    pageSizeOptions: [25, 50, 100],
    reloadDelayAfterNoticeInMinutes: 10,
    reloadDelayInMinutes: 1439,
    reloadNoticeDisplayInSeconds: 30,
  },
  version: {
    environment: AppEnvironment.stage,
    displayNotification: true,
  },
};
