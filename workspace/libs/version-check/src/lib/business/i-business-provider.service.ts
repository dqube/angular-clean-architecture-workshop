import { Observable } from 'rxjs';
import { ApiResponse } from '@buildmotion/types';

export interface IBusinessProviderService {
  retrieveApplicationInfo<T>(): Observable<ApiResponse<T>>;
}
