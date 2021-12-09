import { LoggingService } from '@buildmotion/logging';
import { ActionBase } from '@buildmotion/foundation';
import { Observable } from 'rxjs';
import { BusinessProviderService } from './../business-provider.service';
import { ApiResponse } from '@buildmotion/types';

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
export abstract class BusinessActionBase<T> extends ActionBase<T> {
  showRuleMessages = true;
  hideRuleMessages = false;

  businessProvider: BusinessProviderService;
  loggingService: LoggingService;
  actionName: string;
  public response: Observable<ApiResponse<T>>;

  constructor(actionName: string) {
    super();
    this.actionName = actionName;
  }

  /**
   * Use the [Do] method to perform the action. Also uses [inversion of control]
   * and provides the action the same instance of the [service context] and
   * [logging service].
   */
  Do(businessProvider: BusinessProviderService) {
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;

    this.execute();
  }
}
