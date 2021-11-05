import { ActionResult } from '@buildmotion/actions';
import { ApiResponse } from '@buildmotion/common';
import { IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@buildmotion/rule-engine';
import { of } from 'rxjs';

import { BusinessActionBase } from './business-action-base';
import { Notification } from '../../models/notification.model';

export class ValidateNotificationAction<T> extends BusinessActionBase<T> {
  notification: Notification;
  doNotDisplayToUser = false;

  /**
   * Use the constructor to provide any required inputs for the action.
   */
  constructor(notification: Notification) {
    super('ValidateNotificationAction');
    this.notification = notification;
  }

  /**
   * Use this pipeline method as an opportunity to
   * setup the action for processing, validating business rules, and/or
   * performing other data validation.
   *
   * This method runs before [validationAction] and [performAction].
   */
  preValidateAction() {
    this.validationContext
      .addRule(new IsNotNullOrUndefined('FormMessageIsNotNull', 'The form message cannot be null or undefined.', this.notification, this.doNotDisplayToUser))
      .addRule(
        new StringIsNotNullEmptyRange(
          'MessageTitleIsValid',
          'The message title is not valid. Must be within 2 and 45 characters.',
          this.notification.title,
          2,
          45,
          this.doNotDisplayToUser
        )
      )
      .addRule(
        new StringIsNotNullEmptyRange(
          'MessageDescriptionIsValid',
          'The message description is not valid. Must be within 1 and 200 characters.',
          this.notification.description,
          1,
          200,
          this.doNotDisplayToUser
        )
      )
      .addRule(new IsNotNullOrUndefined('NotifierTypeIsValid', 'The notifier type is not valid.', this.notification.notifierType, this.doNotDisplayToUser));

    this.notification.messages.forEach((item) => {
      this.validationContext.addRule(
        new StringIsNotNullEmptyRange('MessageIsValid', 'The message item is not valid. Must be within 2 and 125 characters.', item, 2, 125)
      );
    });
  }

  /**
   * Use this method to implement the action's business logic. This
   * method will execute if there are no validation or business rule violations.
   *
   * Wraps the response in an ApiResponse to return the value using the action's [response] property.
   */
  performAction() {
    this.actionResult = ActionResult.Success;
    const data: unknown = this.notification;
    const successApiMessage = new ApiResponse<T>();
    successApiMessage.isSuccess = true;
    successApiMessage.data = <T>data;

    this.response = of(successApiMessage);
  }
}
