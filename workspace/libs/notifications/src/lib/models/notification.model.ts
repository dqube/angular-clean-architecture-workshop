import { NotificationOptions } from './notification-options.model';
import { NotificationSeverity } from './notification-severity.enum';
import { NotifierType } from './notifier-type.enum';

export class Notification {
  title: string;
  description: string;
  messages: string[] = [];
  severity: NotificationSeverity = NotificationSeverity.information;
  notifierType?: NotifierType;
  options?: NotificationOptions;

  constructor(title?: string, description?: string, notifierType?: NotifierType, severity?: NotificationSeverity, messages?: string[], options?: NotificationOptions);
  constructor(title: string, description?: string, notifierType?: NotifierType, severity?: NotificationSeverity, messages?: string[], options?: NotificationOptions);
  constructor(title: string, description: string, notifierType?: NotifierType, severity?: NotificationSeverity, messages?: string[], options?: NotificationOptions);
  constructor(title: string, description: string, notifierType: NotifierType, severity?: NotificationSeverity, messages?: string[], options?: NotificationOptions);
  constructor(title: string, description: string, notifierType: NotifierType, severity: NotificationSeverity, messages?: string[], options?: NotificationOptions);
  constructor(title: string, description: string, notifierType: NotifierType, severity: NotificationSeverity, messages: string[], options: NotificationOptions) {
    this.title = title;
    this.description = description;
    this.messages = messages ? messages : [];
    this.severity = severity ? severity : NotificationSeverity.information;
    this.notifierType = notifierType ? notifierType : NotifierType.Unknown;
    this.options = options;
  }
}
