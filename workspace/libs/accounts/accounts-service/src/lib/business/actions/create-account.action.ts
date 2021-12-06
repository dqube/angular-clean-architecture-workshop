import { BusinessActionBase } from './business-action-base';
import { Severity } from '@buildmotion/logging';
import { NewAccount } from '@buildmotion/accounts/types';
import { IsNotNullOrUndefined, IsTrue } from '@buildmotion/rule-engine';

/**
 * Use this action to perform business logic with validation and business rules.
 */
export class CreateAccountAction<T> extends BusinessActionBase<T> {
  constructor(private newAccount: NewAccount) {
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
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to validate the new account information for ${this.newAccount.emailAddress ?? 'n/a'}.`);
    this.validationContext.addRule(
      new IsNotNullOrUndefined(
        'DataIsValid',
        'The account info is not right.',
        this.newAccount,
        this.showRuleMessages
      )
    )
    // .addRule(
    //   new IsTrue(
    //     'AcceptedIsValid',
    //     'You must accept the terms and conditions.',
    //     this.newAccount.acceptTermsConditions,
    //     this.showRuleMessages
    //   )
    // );
  }

  /**
  * Use the [performAction] operation to execute the target of the action's business logic. This
  * will only run if the rules and validations are successful.
  */
  performAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to call API to complete action.`);
    this.response = this.businessProvider.apiService.createAccount<T>(this.newAccount);
  }
}
