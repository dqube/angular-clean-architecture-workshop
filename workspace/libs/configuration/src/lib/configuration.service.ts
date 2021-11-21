import { Injectable, Optional } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { IConfiguration } from './i-configuration';
import { ConfigurationContext } from './configuration-context';
import { Guid } from 'guid-typescript';
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService implements IConfigurationService {
  config!: IConfiguration;
  id: string = Guid.create().toString();

  private settingsSubject: Subject<IConfiguration> = new ReplaySubject<IConfiguration>(1);
  public readonly settings$: Observable<IConfiguration> = this.settingsSubject.asObservable();

  constructor(@Optional() context: ConfigurationContext) {
    if (context) {
      this.settingsSubject.next(context.config);
    }
  }

  set settings(value) {
    this.config = value;
    this.settingsSubject.next(this.config);
  }

  get settings(): IConfiguration {
    return this.config;
  }
}
export interface IConfigurationService {
  readonly settings$: Observable<IConfiguration>
}
