import { Injectable } from '@angular/core';
import { IConfiguration } from './i-configuration';

@Injectable(
  { providedIn: 'root' }
)
export class ConfigurationContext {
  config!: IConfiguration;
}
