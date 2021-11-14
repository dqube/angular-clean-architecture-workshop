import { ILogEntry } from '../i-log-entry';
import { Injectable } from '@angular/core';
import { LogWriter } from './log-writer';
import { LoggingService } from '../logging.service';
import { Severity } from '../severity.enum';
import { noop } from 'rxjs';

/**
 * Use this writer to log information to the browser console.
 */
@Injectable()
export class ConsoleWriter extends LogWriter {
  constructor(private loggingService: LoggingService) {
    super();
    if (loggingService.config.isProduction === false) {
      this.loggingService.logEntries$.subscribe((logEntry) => this.handleLogEntry(logEntry));
    }
  }

  handleLogEntry(logEntry: ILogEntry) {
    this.targetEntry = logEntry;
    this.execute();
  }

  /**
   * No setup required for the console writer.
   */
  public setup(): void {
    noop();
  }

  /**
   * Implementation of the abstract method. This will perform the
   * actual `write` action for the specified writer.
   */
  public write(): void {
    switch (this.targetEntry.severity) {
      /* eslint-disable no-restricted-syntax */
      /* eslint-disable no-console */
      case Severity.Debug:
        console.debug(this.targetEntry);
        break;
      case Severity.Information:
        console.info(this.targetEntry);
        break;
      case Severity.Warning:
        console.warn(this.targetEntry);
        break;
      case Severity.Error:
        console.error(this.targetEntry);
        break;
      case Severity.Critical:
        console.error(this.targetEntry);
        break;
      default:
        break;
      /* eslint-enable no-restricted-syntax */
      /* eslint-enable no-console */
    }
  }
}
