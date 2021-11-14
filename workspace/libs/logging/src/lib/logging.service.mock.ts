import { Injectable } from '@angular/core';
import { IConfiguration, ILoggingConfig, LoggingConfig } from '@buildmotion/configuration';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { ILogEntry } from './i-log-entry';
import { ILoggingService } from './logging.service';
import { Severity } from './severity.enum';


// Type 'LoggingServiceMock' is missing the following properties from type 'ILoggingService': config, id, configService, handleSettingsts(2739)
// i-actionable.ts(7, 3): The expected type comes from property 'loggingService' which is declared here on type 'IActionable'

@Injectable()
export class LoggingServiceMock implements ILoggingService {
  applicationName = 'application';
  config!: LoggingConfig;
  configService!: undefined;
  handleSettings!: () => { unknown: any };
  id: Guid = Guid.create();
  isProduction!: boolean;
  logEntries$: Subject<ILogEntry> = new Subject<ILogEntry>();
  loggingConfig!: ILoggingConfig;
  message!: string;
  serviceName = 'LoggingServiceMock';
  severity!: Severity;
  source!: string;
  stack!: string;
  timestamp!: Date;
  version = '0.0.0';

  setupConfiguration(settings: IConfiguration) {
    this.isProduction = false;
  }

  log(source: string, severity: Severity, message: string) {
    this.source = source;
  }
}
