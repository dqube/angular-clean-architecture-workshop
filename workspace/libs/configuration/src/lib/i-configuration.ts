import { IAPIConfig } from './config/i-api-config';
import { IAppVersionConfig } from './config/i-app-version-config';
import { IDataDogConfig } from './config/i-data-dog-config';
import { IErrorHandingConfig } from './config/i-error-handling-config';
import { ILoggingConfig } from './config/i-logging-config';
import { IMatomoAnalytics } from './config/i-matomo-analytics-config';
import { IWebConfig } from './config/i-web-config';

export interface IConfiguration {
  apiConfig: IAPIConfig;
  dataDogConfig: IDataDogConfig;
  errorHandlingConfig: IErrorHandingConfig;
  loggingConfig: ILoggingConfig;
  matomoConfig: IMatomoAnalytics;
  version: IAppVersionConfig;
  webConfig: IWebConfig;
}
