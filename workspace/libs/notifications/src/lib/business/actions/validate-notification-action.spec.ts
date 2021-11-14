import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoggingService, LoggingServiceMock } from '@buildmotion/logging';
import { TestBed, inject } from '@angular/core/testing';

import { ActionResult } from '@buildmotion/actions';
import { ServiceContext } from '@buildmotion/foundation';
import { ValidateNotificationAction } from './validate-notification-action';
import { NotificationSeverity } from '../../models/notification-severity.enum';
import { NotifierType } from '../../models/notifier-type.enum';
import { BusinessProviderService } from '../business-provider.service';
import { Notification } from '../../models/notification.model';

describe('ValidateFormMessageAction', () => {
  it('should create an instance', () => {
    expect(new ValidateNotificationAction(new Notification())).toBeTruthy();
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggingService,
          useClass: LoggingServiceMock,
        },
        HttpClient,
        HttpHandler,
      ],
    })
  );

  it('should contain a valid message', () => {
    const logger: LoggingService = TestBed.inject(LoggingService);
    const notification = new Notification('The Title', 'A description for the notification.', NotifierType.Banner);
    notification.messages.push('Email is not valid.');

    const action = new ValidateNotificationAction(notification);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateFormMessageAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
  });

  it('should contain invalid NotifierType', () => {
    const logger: LoggingService = TestBed.inject(LoggingService);
    const notification = new Notification('The Title', 'A description for the notification.', NotifierType.Dialog);
    notification.messages.push('Email is not valid.');

    const action = new ValidateNotificationAction(notification);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateFormMessageAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
  });

  it('should contain invalid title', () => {
    const logger: LoggingService = TestBed.inject(LoggingService);
    const notification = new Notification('', 'A description for the notification.', NotifierType.Banner);
    notification.messages.push('Notification message.');

    const action = new ValidateNotificationAction(notification);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateFormMessageAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(
      action.validationContext.results.filter((r) => {
        return r.isValid === false && r.rulePolicy.name === 'MessageTitleIsValid';
      }).length
    ).toEqual(1);
    expect(
      action.validationContext.results.find((r) => {
        return !r.isValid && r.rulePolicy.name === 'MessageTitleIsValid';
      })
    ).not.toBeNull();
  });

  it('should contain a failed rule result', () => {
    const logger: LoggingService = TestBed.inject(LoggingService);
    const notification = new Notification('', 'A description for the notification.', NotifierType.Banner);
    notification.messages.push('Notification message.');

    const action = new ValidateNotificationAction(notification);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateFormMessageAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(
      action.validationContext.results.filter((r) => {
        return r.isValid === false && r.rulePolicy.name === 'MessageTitleIsValid';
      }).length
    ).toEqual(1);
  });

  it('should contain [ServiceContext] message that is not displayable', () => {
    const logger: LoggingService = TestBed.inject(LoggingService);
    const notification = new Notification('', 'A description for the notification.', NotifierType.Banner);
    notification.messages.push('Notification message.');

    const action = new ValidateNotificationAction(notification);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateFormMessageAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(
      action.serviceContext.Messages.find((m) => {
        return !m.DisplayToUser && m.Name === 'MessageTitleIsValid';
      })
    ).not.toBeNull();
  });

  it('should have invalid title length (max allowed characters)', () => {
    const logger: LoggingService = TestBed.inject(LoggingService);
    const notification = new Notification('12345678901234567890123456789012345678901234567890', 'A description for the notification.', NotifierType.Banner);
    notification.messages.push('Notification message.');

    const action = new ValidateNotificationAction(notification);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateFormMessageAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(
      action.serviceContext.Messages.find((m) => {
        return !m.DisplayToUser && m.Name === 'MessageTitleIsValid';
      })
    ).not.toBeNull();
  });

  it('should have invalid title length (minimum characters)', () => {
    const logger: LoggingService = TestBed.inject(LoggingService);
    const notification = new Notification('1', 'A description for the notification.', NotifierType.Banner);
    notification.messages.push('Notification message.');

    const action = new ValidateNotificationAction(notification);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateFormMessageAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(
      action.serviceContext.Messages.find((m) => {
        return !m.DisplayToUser && m.Name === 'MessageTitleIsValid';
      })
    ).not.toBeNull();
  });

  it('should have invalid message length (minimum characters)', () => {
    const logger: LoggingService = TestBed.inject(LoggingService);
    const notification = new Notification('The Title is Valid', 'A description for the notification.', NotifierType.Banner);
    notification.messages.push('1'); // invalid; should be 2-125 characters.

    const action = new ValidateNotificationAction(notification);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateFormMessageAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(
      action.serviceContext.Messages.find((m) => {
        return !m.DisplayToUser && m.Name === 'MessageIsValid';
      })
    ).not.toBeUndefined();
  });

  it('should execute using the BusinessProvider', inject([BusinessProviderService], (businessProvider: BusinessProviderService) => {
    const notification = new Notification('ApplicationName', 'A description for the notification.', NotifierType.Banner, NotificationSeverity.warning);
    notification.messages.push('Email is not valid.');

    const action = new ValidateNotificationAction(notification);
    action.actionName = 'ValidateFormMessageAction';
    action.Do(businessProvider);

    action.businessProvider.writeMessages();

    expect(action.loggingService.applicationName).toBeTruthy();
    expect(action.businessProvider).not.toBeNull();
    expect(action.businessProvider.loggingService).not.toBeNull();
    expect(action.serviceContext).not.toBeNull();
    expect(action.validationContext.isValid).toEqual(true);
  }));
});
