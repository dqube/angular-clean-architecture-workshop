import { Injectable } from '@angular/core';
import { ApiResponse } from '@buildmotion/types';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { LoggingService } from '@buildmotion/logging';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
import { ValidateApiResponseAction } from './actions/validate-api-response-action';
import { ValidateNotificationAction } from './actions/validate-notification-action';

@Injectable({
  providedIn: 'root',
})
export class BusinessProviderService extends ServiceBase {
  constructor(logger: LoggingService, serviceContext: ServiceContext) {
    super('NotificationService.BusinessProviderService', logger, serviceContext);
  }

  /**
   * Use to execute one or more actions to process the business operation.
   * @param message a message to display form information to a user.
   */
  validateNotification<T extends Notification>(message: Notification): Observable<ApiResponse<T>> {
    const action = new ValidateNotificationAction<T>(message);
    return action.Do({ ...this });
  }

  validateApiResponse<T extends Notification>(apiResponse: ApiResponse<T>): Observable<ApiResponse<T>> {
    const action = new ValidateApiResponseAction<T>(apiResponse);
    return action.Do({ ...this });
  }
}
