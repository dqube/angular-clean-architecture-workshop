// import { Action } from './action';
import { Action } from '../lib/Action';
import { ActionResult } from './action-result';

class MyAction extends Action {
  isTestAction = true;
  performAction() {
    this.isTestAction = true;
  }
  start() {
    this.isTestAction = true;
  }
  audit() {
    this.isTestAction = true;
  }
  preValidateAction() {
    this.isTestAction = true;
  }
  postValidateAction() {
    this.isTestAction = true;
  }
  preExecuteAction() {
    this.isTestAction = true;
  }
  postExecuteAction() {
    this.isTestAction = true;
  }
  finish() {
    this.isTestAction = true;
  }
  // performAction() {}
  // preValidateAction() {}
  validateActionResult(): ActionResult {
    return this.actionResult;
  }
}

let testAction: MyAction;
describe('Action', () => {
  beforeEach(() => {
    testAction = new MyAction();
  });

  it('should create an instance', () => {
    expect(testAction).toBeTruthy();
  });

  it('should call preValidateAction when executed', () => {
    spyOn(testAction, 'preValidateAction');
    testAction.execute();
    expect(testAction.preValidateAction).toBeCalled();
  });

  it('should call performAction when executed', () => {
    spyOn(testAction, 'performAction');
    testAction.execute();
    expect(testAction.performAction).toBeCalled();
  });

  it('should call validateActionResult when executed', () => {
    spyOn(testAction, 'validateActionResult');
    testAction.execute();
    expect(testAction.validateActionResult).toBeCalled();
  });

  it('should return default action result', () => {
    testAction.execute();
    expect(testAction.actionResult).toEqual(ActionResult.Unknown);
  });
});
