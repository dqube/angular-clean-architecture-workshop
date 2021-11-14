import { Observable, ReplaySubject, Subject } from 'rxjs';

import { AppConfigMock } from './app-config.mock';
import { IConfiguration } from '../i-configuration';
import { IConfigurationService } from '../configuration.service';
import { Injectable, Optional } from '@angular/core';
import { ConfigurationContext } from '../configuration-context';

@Injectable()
export class ConfigurationServiceMock implements IConfigurationService {
  private settingsSubject: Subject<IConfiguration> = new ReplaySubject<IConfiguration>(1);
  public readonly settings$: Observable<IConfiguration> = this.settingsSubject.asObservable();
  config = AppConfigMock;

  constructor(@Optional() context: ConfigurationContext) {
    if (context) {
      this.settingsSubject.next(context.config);
    }
  }

  set settings(value: IConfiguration) {
    this.config = value;
    if (this.config) {
      this.settingsSubject.next(this.config);
    }
  }

  get settings(): IConfiguration {
    return this.config;
  }
}
