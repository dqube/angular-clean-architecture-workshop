import { BusinessActionBase } from './business-action-base';
import { Severity } from '@buildmotion/logging';

/**
 * Use this action to verify a new alert for a monitored term.
 */
export class RetrieveApplicationInfoAction<T> extends BusinessActionBase<T> {
  constructor() {
    super('RetrieveApplicationInfoAction');
  }

  performAction() {
    this.loggingService?.log(this.actionName, Severity.Information, `Preparing to verify monitored term alert using API.`);
    this.response = this.businessProvider?.apiService.retrieveApplicationInfo();
  }
}
