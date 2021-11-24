import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigurationService } from '@buildmotion/configuration';
import { LoggingService } from '@buildmotion/logging';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { ApiResponse } from '@buildmotion/common';
import { HttpAccountsServiceRepositoryService } from './http-accounts-service-repository.service';
import { IBusinessProviderService } from './i-business-provider.service';
import { NewAccount } from '@buildmotion/accounts/types';
import { CreateAccountAction } from './actions/create-account.action';
import { IHttpAccountsServiceRepositoryService } from './i-http-accounts-service-repository.service';

@Injectable({
  providedIn: 'root',
})


export class BusinessProviderService extends ServiceBase implements IBusinessProviderService, IBusinessProviderService {

  constructor(
    @Inject(HttpAccountsServiceRepositoryService) public apiService: IHttpAccountsServiceRepositoryService,
    public configService: ConfigurationService,
    loggingService: LoggingService,
    serviceContext: ServiceContext
  ) {
    super('BusinessProviderService', loggingService, serviceContext);
  }

  createAccount<T>(newAccount: NewAccount): Observable<ApiResponse<T>> {
    const action = new CreateAccountAction<T>(newAccount);
    action.Do({ ...this });
    return action.response;
  }
}
