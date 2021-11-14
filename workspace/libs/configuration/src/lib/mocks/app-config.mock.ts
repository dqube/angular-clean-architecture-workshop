import { AppEnvironment } from '../config/app-environment.enum';
import { IConfiguration } from '../i-configuration';

export const AppConfigMock: IConfiguration = {
  apiConfig: {
    baseUrl: 'https://api.buildmotion.io/',
    csrf: 'https://api.buildmotion.io/auth2/csrf',
    health: 'https://api.buildmotion.io/v1/dev/health',
    security: 'https://api.buildmotion.io/security',
    version: 'https://api.buildmotion.io/version'
  },
  dataDogConfig: {
    logs: {
      clientToken: 'MOCK-TOKEN-HERE',
      forwardErrorsToLogs: false,
      sampleRate: 100,
      site: 'datadoghq.com'
    },
    realUserMonitoring: {
      applicationId: 'BEEF-TACO-CORN-GOOD-CORN',
      clientToken: 'pubCORNBEEFISGOOD0fbc',
      site: 'datadoghq.com',
      service: 'buildMotionNonProd',
      env: 'non-prod',
      version: '42.0.0',
      sampleRate: 100,
      trackInteractions: true
    }
  },
  loggingConfig: {
    applicationName: 'dashboard',
    isProduction: false,
  },
  errorHandlingConfig: {
    applicationName: 'dashboard',
    includeDefaultErrorHandling: true,
  },
  matomoConfig: {
    enabled: true,
    script: ``,
    siteId: '1',
    url: `https://matomo.buildmotion.io`
  },
  amplifyConfig: {
    Auth: {
      mandatorySignIn: true,
      region: ``,
      userPoolId: ``,
      identityPoolId: ``,
      userPoolWebClientId: ``
    },
    Storage: {
      region: ``,
      bucket: ``,
      identityPoolId: ``
    },
    API: {
      endpoints: [
        {
          name: `dashboard`,
          endpoint: ``,
          region: ``
        },
      ]
    }
  },
  webConfig: {
    applicationName: 'dashboard',
    blogURL: 'https://www.medium.com/@angularlicious',
    companyEffectiveDate: new Date(2020, 10, 1),
    companyName: 'buildmotion',
    defaultPageSize: 25,
    email: 'info@buildmotion.io',
    googleTagManagerId: 'GTM-12341234',
    keywordValidationInMilliseconds: 750,
    pageSizeOptions: [25, 50, 100],
    reloadDelayAfterNoticeInMinutes: 0,
    reloadDelayInMinutes: 1439,
    reloadNoticeDisplayInSeconds: 30,
    social: {
      instagram: {
        name: '',
        URL: '',
      },
      twitter: { name: '', URL: '' },
    },
    version: '42.42.42',
    website: 'buildmotion.io',
  },
  version: {
    environment: AppEnvironment.local,
    displayNotification: true,
  },
};
