import { AppEnvironment } from './app-environment.enum';

export interface IAppVersionConfig {
  environment: AppEnvironment;
  displayNotification: boolean;
}
