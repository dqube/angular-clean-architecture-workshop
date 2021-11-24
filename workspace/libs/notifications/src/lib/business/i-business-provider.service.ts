import { Observable } from 'rxjs';
import { ApiResponse } from '@buildmotion/types';

export abstract class IBusinessProviderService {
  abstract validateNotification<T extends Notification>(message: Notification): Observable<ApiResponse<T>>;
  abstract validateApiResponse<T extends Notification>(apiResponse: ApiResponse<T>): Observable<ApiResponse<T>>;
}
