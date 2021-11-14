import { Observable } from 'rxjs';
import { ApiResponse } from '@buildmotion/common';

export interface IBusinessProviderService {
  retrieveApplicationInfo<T>(): Observable<ApiResponse<T>>;
}
