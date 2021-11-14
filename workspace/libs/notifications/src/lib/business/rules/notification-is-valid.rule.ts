import { CompositeRule, IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@buildmotion/rule-engine';

import { Notification } from '../../models/notification.model';

export class NotificationIsValidRule extends CompositeRule {
  target: Notification;
  displayToUser = true;
  doNotDisplayToUser = false;

  constructor(name: string, message: string, target: Notification, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.target = target;

    this.configureRules();
  }

  private configureRules() {
    this.rules.push(new IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));

    this.rules.push(
      new StringIsNotNullEmptyRange(
        'NotificationTitleIsValid',
        'The message title is not valid. Must be within 2 and 45 characters.',
        this.target.title,
        2,
        45,
        this.doNotDisplayToUser
      )
    );

    this.rules.push(
      new StringIsNotNullEmptyRange(
        'NotificationDescriptionIsValid',
        'The message description is not valid. Must be within 2 and 200 characters.',
        this.target.description,
        2,
        200,
        this.doNotDisplayToUser
      )
    );

    this.target.messages.forEach((item) => {
      this.rules.push(new StringIsNotNullEmptyRange('NotificationIsValid', 'The message item is not valid. Must be within 1 and 300 characters.', item, 1, 300));
    });
  }
}
