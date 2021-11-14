import { ValidationContext, ValidationContextState } from '@buildmotion/rule-engine';

import { ActionResult } from './action-result';
import { IAction } from './i-action';

/**
 * This is the framework Action class that provides the pipeline of pre/post
 * execution methods. This class implements the [Template Method] pattern. Use
 * it to create and manage the life cycle of an action.
 *
 * The pre-execute functions that can be implemented are:
 *		1. start();
 *		2. audit();
 *		3. preValidateAction();
 *		4. evaluateRules();
 *		5. postValidateAction();
 *		6. preExecuteAction();
 *
 *If the status of action is good, the business logic will be executed using the:
 *		7. processAction();
 *
 * The post-execution functions that can be implemented are:
 *		8. postExecuteAction();
 *		9. validateActionResult();
 *		10. finish();
 */
// export abstract class Action implements IAction {
export abstract class Action implements IAction {
  actionName!: string;

  /**
   * Indicates if the action is allowed execution. If there are any rule
   * violations in the validation context, the action is not allowed to
   * execute.
   */
  allowExecution = true;

  /**
   * The validation context for the specified action instance.
   */
  private _validationContext: ValidationContext = new ValidationContext();

  /**
   * The result of the action. The default value is [Unknown], until the action
   * is executed.
   */
  actionResult: ActionResult = ActionResult.Unknown;

  /**
   * Use to retrieve the [ValidationContext] for the specified action.
   */
  public get validationContext(): ValidationContext {
    return this._validationContext;
  }

  /**
   * Use this method to execute a concrete action. A concrete action must implement
   * the [processAction] and the [validateActionResult] functions to be a valid
   * action.
   */
  public execute() {
    this.processActionPipeline();
  }

  /**
   * Use this method to process the action pipeline methods.
   */
  public processActionPipeline() {
    this.startAction();
    if (this.allowExecution) {
      this.processAction();
    }
    this.finishAction();
  }

  /**
   * Use this method to call the pipeline methods for the [start] or beginning
   * process of the action pipeline.
   */
  private startAction() {
    this.start();
    this.audit();
    this.preValidateAction();
    this.evaluateRules();
    this.postValidateAction();
    this.preExecuteAction();
  }

  /**
   * Use this method to execute the methods at the end of the action pipeline.
   */
  private finishAction() {
    this.postExecuteAction();
    this.validateActionResult();
    this.finish();
  }

  /**
   * Use this method to process the action. This will only be called if the action's
   * validation context is in a valid state (no rule violations).
   *
   * All concrete actions are required to provide an implementation of the [performAction]
   * method that is called for this part of the action pipeline.
   */
  private processAction() {
    this.performAction();
  }

  /**
   * All action must implement this function. This is where your
   * [business logic] should be implemented. This function is called if
   * there are no validation rule exceptions.
   */
  abstract performAction(): void;

  /**
   * Override/Implement this function to perform an early operation in the action pipeline.
   * This function belongs to the pre-execute functions of the action pipeline.
   */
  abstract start(): void;

  /**
   * Implement this function to perform any auditing features during the pre-execution of the
   * business logic.
   */
  abstract audit(): void;

  /**
   * Use this function to setup any validation rules before the validation happens. This
   * function is called before [evaluateRules]. Must be implemented by concrete actions.
   */
  abstract preValidateAction(): void;

  /**
   * Use this function to implement the execution of the validation and business rules. This
   * function is called after [preValidateAction].
   */
  evaluateRules() {
    const context = this.validateAction();
    if (context.isValid) {
      this.allowExecution = true;
      this.validationContext.state = ValidationContextState.Success;
    } else {
      this.allowExecution = false;
      this.validationContext.state = ValidationContextState.Failure;
    }
  }

  /**
   * Use to determine or handle the results of the rule evaluation. This
   * function is called after the [evaluateRules].
   */
  abstract postValidateAction(): void;

  /**
   * Use this function to perform any setup before the action is executed.
   */
  abstract preExecuteAction(): void;

  /**
   * Use this function to evaluate the action after the the business logic within
   * the [performAction] has executed.
   */
  abstract postExecuteAction(): void;

  /**
   * This function requires implementation by concrete actions to determine the state and result of the action.
   * Use this opportunity to check the ValidationContext to handle any rule violations.
   */
  abstract validateActionResult(): ActionResult;

  /**
   * Use this function to perform any cleanup, logging, or disposing of resources used
   * by the action. This is the last function called during the pipeline.
   */
  abstract finish(): void;

  /**
   * Implement this function to perform validation of business rules and data.
   */
  validateAction() {
    return this.validationContext;
  }
}
