import { BusinessActionBase } from './business-action-base';
import { NewAccount, NewAccountResponse } from '@buildmotion/accounts/types';
import { IsNotNullOrUndefined, IsTrue } from '@buildmotion/rule-engine';
import { Guid } from 'guid-typescript';

/**
 * Use this action to perform business logic with validation and business rules.
 */
export class CreateAccountAction<T> extends BusinessActionBase<T> {
  constructor(private account: NewAccount) {
    super('CreateAccountAction');
  }

  /**
  * Use the [preValidateAction] to add any business or validation rules that
  * are required to pass in order to perform the action.
  *
  * Use the [ValidationContext] item of the action to add rules. The ValidationContext
  * uses a Fluent API to allow for chained rules to be configured.
   */
  preValidateAction() {
    this.validationContext.addRule(
      new IsNotNullOrUndefined(
        'AccountIsNotNullUndefined',
        'The account information cannot be null or undefined.',
        this.account,
        this.hideRuleMessages
      )
    );

    if (this.account) {
      this.validationContext.addRule(
        new IsTrue(
          'TermsAndConditionsAccepted',
          'The terms and conditions must be accepted by the user.',
          this.account.acceptTermsConditions,
          this.showRuleMessages
        )
      )
    }
  }

  /**
  * Use the [performAction] operation to execute the target of the action's business logic. This
  * will only run if the rules and validations are successful.
  */
  performAction() {
    if (this.account && this.account.acceptTermsConditions) {
      const result = new NewAccountResponse();
      result.accountId = Guid.create().toString();;
      result.emailAddress = this.account.emailAddress;
      result.userId = Guid.create().toString();

      this.response = result;
    } else {
      throw new Error(`Failed to create account.`);
    }
  }
}
