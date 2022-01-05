/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ActionResult } from '@buildmotion/actions';
import { CompositeRule, RuleResult, ValidationContext, ValidationContextState } from '@buildmotion/rule-engine';
import { ApiMessage, ApiResponse } from '@buildmotion/types';
import { Observable, of } from 'rxjs';

/**
 * This is the application's base Action class that provides implementation of pipeline methods - pre/post
 * execution methods.
 *
 * The pre-execute methods that can be implemented are:
 *		1. start();
 *		2. audit();
 *		3. preValidateAction();
 *		4. evaluateRules();
 *		5. postValidateAction();
 *		6. preExecuteAction();
 *
 *If the status of action is good, the business logic will be executed using the:
 *		1. processAction();
 *
 * The post-execution methods that can be implemented are:
 *		1. postExecuteAction();
 *		2. validateActionResult();
 *		3. finish();
 */
export class ActionBase<T> extends Action {
  response: T | any | null | undefined;
  actionName!: string;

  constructor(actionName?: string) {
    super();
    this.actionName = actionName ?? '';
  }

  start() {
    // this.loggingService?.log(
    //   this.actionName,
    //   Severity.Information,
    //   `Preparing to [start] action.`
    // );
  }

  audit() {
    // this.loggingService?.log(this.actionName, Severity.Information, `Preparing to [audit] action.`);
  }

  createUnknownResponse(): Observable<any> | any {
    const response = new ApiResponse();
    return of(response);
  }

  preExecuteAction() {
    // this.loggingService?.log(this.actionName, Severity.Information, `Preparing to [preExecuteAction] action.`);
  }

  performAction() {
    // this.loggingService?.log(this.actionName, Severity.Information, `Preparing to perform [${this.actionName}].`);
  }

  preValidateAction() {
    // this.loggingService?.log(this.actionName, Severity.Information, `Preparing to preValidateAction [${this.actionName}].`);
  }

  finish() {
    // this.loggingService?.log(this.actionName, Severity.Information, `Preparing to [finish] action.`);
  }

  /**
   * This is a required implementation if you want to render/execute the rules that
   * are associated to the specified action.
   */
  validateAction(): ValidationContext {
    return this.validationContext.renderRules();
  }

  postValidateAction() {
    // this.loggingService?.log(this.actionName, Severity.Information, `Preparing to determine if the action contains validation errors in ${this.actionName}`);

    if (this.validationContext.hasRuleViolations()) {
      // this.loggingService?.log(this.actionName, Severity.Information, `The target contains validation errors in ${this.actionName}`);

      // Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
      this.validationContext.results.forEach((result) => {
        if (!result.isValid) {
          this.publishRuleResult(result);
          this.retrieveRuleDetails(result);
        }
      });
    }
  }

  createFailResponse(): Observable<ApiResponse<T>> {
    const apiResponse = new ApiResponse<T>();
    apiResponse.isSuccess = false;
    apiResponse.message = `Request failed.`;

    const messages = new Array<ApiMessage>();
    // if (this.serviceContext.hasErrors() && this.serviceContext.Messages.length > 0) {
    //   this.serviceContext.Messages.map((m) => {
    //     const error = new ApiMessage();
    //     error.message = m.Message;
    //     error.messageType = ApiMessageType.Error;
    //     error.code = m.Name;

    //     messages.push(error);
    //   });
    // }
    apiResponse.messages = messages.length > 0 ? messages : [];
    return of(apiResponse);
  }

  postExecuteAction() {
    if (this.actionResult === ActionResult.Fail) {
      // this.serviceContext.Messages.forEach((e) => {
      //   if (e.MessageType === MessageType.Error) {
      //     // this.loggingService?.log(this.actionName, Severity.Error, e.toString());
      //   }
      // });
    }
  }

  /**
   * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
   */
  validateActionResult(): ActionResult {
    // this.loggingService?.log(this.actionName, Severity.Information, `Running [validateActionResult] for ${this.actionName}.`);
    // determine the status of the action based on any rule violations;
    if (this.validationContext.hasRuleViolations()) {
      // this.loggingService?.log(this.actionName, Severity.Error, `The ${this.actionName} contains rule violations.`);
      this.actionResult = ActionResult.Fail;
    }
    this.actionResult = ActionResult.Success;
    return this.actionResult;
  }

  /**
   * Use to process rule results for composite rules. Note, that this function is recursive
   * and will process all composite rules in the rule set contained in the ValidationContext.
   * @param ruleResult The result of a rendered rule.
   */
  retrieveRuleDetails(ruleResult: RuleResult) {
    if (ruleResult.rulePolicy instanceof CompositeRule) {
      const composite = ruleResult.rulePolicy as CompositeRule;
      if (composite && composite.hasErrors) {
        const errors = composite.results.filter((result) => !result.isValid && result.rulePolicy && result.rulePolicy.isDisplayable);

        errors.forEach((errorResult) => {
          this.publishRuleResult(errorResult);

          if (errorResult.rulePolicy instanceof CompositeRule) {
            this.retrieveRuleDetails(errorResult);
          }
        });
      }
    }
  }

  /**
   * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
   * @param ruleResult
   */
  publishRuleResult(ruleResult: RuleResult) {
    if (ruleResult) {
      // const serviceMessage = new ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, MessageType.Error);
      // serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
      // serviceMessage.Source = this.actionName;

      // this.serviceContext.Messages.push(serviceMessage);
    }
  }
}
