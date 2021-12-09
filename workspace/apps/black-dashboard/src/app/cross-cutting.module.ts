import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { MatomoService } from '@buildmotion/analytics';
import { ConfigurationContext, ConfigurationModule, ConfigurationService } from '@buildmotion/configuration';
import { ErrorHandlingModule, ErrorHandlingService } from '@buildmotion/error-handling';
import { HttpErrorInterceptor, HttpResponseInterceptor, HttpService } from '@buildmotion/http-service';
import { ConsoleWriter, DataDogWriterService, LoggingModule, LoggingService } from '@buildmotion/logging';
import { NotificationService } from '@buildmotion/notifications';
import { VersionCheckModule, VersionCheckService } from '@buildmotion/version-check';
import * as versionInfo from '../assets/version-info.json';
import { AppConfig } from '../configs/app.config';

/**
 * The factory function to initialize the configuration service for the application.
 * @param configService
 */
export function initializeConfiguration(configContext: ConfigurationContext, configService: ConfigurationService) {
  return () => {
    configService.settings = configContext.config;
    return configService;
  };
}

/**
 * The factory function to initialize the logging service and writer for the
 * application.
 *
 * @param loggingService
 * @param consoleWriter
 */
export function initializeLogWriter(loggingService: LoggingService, consoleWriter: ConsoleWriter) {
  return () => {
    return consoleWriter;
  };
}

const INTERCEPTORS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpResponseInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigurationModule,
    ErrorHandlingModule,
    LoggingModule,
    VersionCheckModule.forRoot({
      application: AppConfig.webConfig.applicationName,
      version: versionInfo.version,
      buildDate: new Date(versionInfo.timestamp),
      hash: versionInfo.hash
    })
  ],
  providers: [],
})
export class CrossCuttingModule {
  static forRoot(): ModuleWithProviders<CrossCuttingModule> {
    return {
      ngModule: CrossCuttingModule,
      providers: [
        {
          provide: ConfigurationContext,
          useValue: { config: AppConfig },
        },
        ConfigurationService,
        LoggingService,
        ConsoleWriter,
        {
          provide: ErrorHandler,
          useClass: ErrorHandlingService,
          deps: [ConfigurationService, LoggingService],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeLogWriter,
          deps: [
            LoggingService,
            ConsoleWriter,
            DataDogWriterService
          ],
          multi: true,
        },
        NotificationService,
        ...INTERCEPTORS,
        MatomoService,
        VersionCheckService,
        HttpService
      ],
    };
  }
}
