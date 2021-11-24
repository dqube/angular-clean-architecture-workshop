import { NewAccount } from '@buildmotion/accounts/types';
import { ApiResponse } from '@buildmotion/common';
import { ConfigurationService } from '@buildmotion/configuration';
import { ServiceContext } from '@buildmotion/foundation';
import { Observable } from 'rxjs';
import { IHttpAccountsServiceRepositoryService } from './i-http-accounts-service-repository.service';

// tslint:disable-next-line:no-empty-interface
export interface IBusinessProviderService {
  serviceContext: ServiceContext;
  apiService: IHttpAccountsServiceRepositoryService;
  configService: ConfigurationService;
  createAccount<T>(newAccount: NewAccount): Observable<ApiResponse<T>>;
}
