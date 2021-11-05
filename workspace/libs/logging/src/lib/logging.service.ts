import { Injectable, Optional } from '@angular/core';
import { ConfigurationService, IConfiguration, LoggingConfig } from '@buildmotion/configuration';
import { Guid } from 'guid-typescript';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ILogEntry } from './i-log-entry';
import { LogEntry } from './log-entry';
import { Severity } from './severity.enum';

export interface ILoggingService {
  serviceName: string;
  source: string;
  severity: Severity;
  message: string;
  timestamp: Date;
  applicationName: string;
  version: string;
  isProduction: boolean;
  config: LoggingConfig;
  id: Guid;
  logEntries$: Observable<ILogEntry>;
  // configService: ConfigurationService;
  handleSettings(settings: IConfiguration): void;
  log(source: string, severity: Severity, message: string, tags?: string[]): void;
}
@Injectable()
export class LoggingService implements ILoggingService {
  serviceName = 'LoggingService';
  source!: string;
  severity!: Severity;
  message!: string;
  timestamp: Date = new Date();
  applicationName!: string;
  version!: string;
  isProduction!: boolean;
  config!: LoggingConfig;
  id: Guid = Guid.create();

  private logEntriesSubject: ReplaySubject<ILogEntry> = new ReplaySubject<ILogEntry>(1);
  public readonly logEntries$: Observable<ILogEntry> = this.logEntriesSubject.asObservable();

  /**
   * The [LoggingService] constructor.
   */
  constructor(@Optional() public configService: ConfigurationService) {
    this.log(this.serviceName, Severity.Information, `Starting logging service [${this.id.toString()}] at: ${this.timestamp}`);
    this.initializeService(configService);
  }

  /**
   * Use to initialize the logging service. Retrieves
   * application configuration settings.
   *
   * @param configService contains the configuration settings for the application
   */
  private initializeService(configService: ConfigurationService) {
    if (configService) {
      this.configService.settings$.pipe(take(1)).subscribe((settings) => this.handleSettings(settings));
    }
  }

  /**
   * Use to handle settings from the configuration service.
   * @param settings
   */
  handleSettings(settings: IConfiguration) {
    if (settings) {
      this.config = settings.loggingConfig;

      this.applicationName = this.config && this.config.applicationName ? this.config.applicationName : 'Angular';
      this.isProduction = this.config && this.config.isProduction ? this.config.isProduction : false;
    }
  }

  /**
   * Use this method to send a log message with severity and source information
   * to the application's logger.
   *
   * If the application environment mode is [Production], the information will
   * be sent to a centralized repository.
   *
   * @param source
   * @param severity
   * @param message
   */
  log(source: string, severity: Severity, message: string, tags?: string[]) {
    this.source = this.applicationName !== source ? `${this.applicationName}.${source}` : this.applicationName;
    this.severity = severity;
    this.message = message;
    this.timestamp = new Date();

    if (tags) {
      tags.push(`LoggerId:${this.id.toString()}`);
    } else {
      tags = [`LoggerId:${this.id.toString()}`];
    }

    const logEntry = new LogEntry(this.applicationName, this.source, this.severity, this.message, tags);
    this.logEntriesSubject.next(logEntry);
  }
}
