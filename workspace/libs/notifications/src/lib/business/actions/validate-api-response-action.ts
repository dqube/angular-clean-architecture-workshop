import { ApiResponse } from '@buildmotion/common';
import { BusinessActionBase } from './business-action-base';
import { Severity } from '@buildmotion/logging';
import { IsNotNullOrUndefined, StringIsNotNullEmptyRange, Range, IsTrue } from '@buildmotion/rule-engine';
import { ActionResult } from '@buildmotion/actions';
import { of } from 'rxjs';

export class ValidateApiResponseAction<T> extends BusinessActionBase<T> {
  constructor(private apiResponse: ApiResponse<T>) {
    super('ValidateApiResponseAction');
  }

  preValidateAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to validate the API response for error messages.`);
    this.validationContext.addRule(new IsNotNullOrUndefined('ApiResponseIsValid', 'The API response cannot be null or undefined.', this.apiResponse, false));

    if (this.apiResponse) {
      this.validationContext.addRule(
        new IsNotNullOrUndefined(
          'ApiMessagesNotNullUndefined',
          'The API response messages is not valid. Cannot be null or undefined.',
          this.apiResponse.messages,
          false
        )
      ).addRule(new IsTrue(
        'ContainsValidMessage',
        'The API response requires a valid message.',
        this.apiResponse.messages.length > 0,
        this.hideRuleMessages
      ));
    }

    if (this.apiResponse && this.apiResponse.messages) {
      this.validationContext.addRule(
        new Range('MessagesLengthMin', 'The API response must contain at least one valid message item.', this.apiResponse.messages.length, 1, 99)
      );

      this.apiResponse.messages.forEach((item) => {
        this.validationContext.addRule(
          new StringIsNotNullEmptyRange('MessageErrorCodeIsValid', 'The message does not contain a valid error code.', item.code, 1, 200)
        );
      });
    }
  }

  performAction() {
    this.actionResult = ActionResult.Success;
    const result: any = this.apiResponse.messages;
    const successApiMessage = new ApiResponse<T>();
    successApiMessage.isSuccess = true;
    successApiMessage.data = <T>result;

    this.response = of(successApiMessage);
  }
}
