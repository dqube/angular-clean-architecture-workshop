import { fakeAsync, TestBed } from '@angular/core/testing';

import { BusinessProviderService } from './business-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationService, ConfigurationServiceMock } from '@buildmotion/configuration';
import { LoggingService, LoggingServiceMock, Severity } from '@buildmotion/logging';
import { NotificationOptions } from '../models/notification-options.model';
import { Notification } from '../models/notification.model';
import { NotifierType } from '../models/notifier-type.enum';
import { NotificationSeverity } from '../models/notification-severity.enum';

describe('BusinessProviderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        BusinessProviderService,
        {
          provide: ConfigurationService,
          useClass: ConfigurationServiceMock,
        },
        {
          provide: LoggingService,
          useClass: LoggingServiceMock,
        },
      ],
    })
  );

  it('should be created', () => {
    const service: BusinessProviderService = TestBed.inject(BusinessProviderService);
    expect(service).toBeTruthy();
  });

  it('should validate a notification message for publication', () => {
    const service: BusinessProviderService = TestBed.inject(BusinessProviderService);
    const logger: LoggingService = TestBed.inject(LoggingService);
    const options: NotificationOptions = new NotificationOptions(undefined, undefined);
    const message = new Notification('title', 'description', NotifierType.Banner, NotificationSeverity.error, ['message1', 'message2'], options);
    service.validateNotification(message).subscribe(
      (response) => {
        expect(response).toEqual(message);
      },
      (error: Error) => {
        logger.log('BusinessProviderService:Spec', Severity.Error, `Error while validating notification message. Error: ${error.message}`);
      },
      () => logger.log('BusinessProviderService:Spec', Severity.Information, 'Finished validating notification message.')
    );
  });
});
