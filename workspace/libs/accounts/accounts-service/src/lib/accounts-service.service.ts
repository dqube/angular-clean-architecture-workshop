import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { LoggingService } from '@buildmotion/logging';
import { Inject, Injectable } from '@angular/core';
import { BusinessProviderService } from './business/business-provider.service';
import { NewAccount } from '@buildmotion/accounts/types';
import { ApiResponse } from '@buildmotion/types';
import { Observable, of } from 'rxjs';
import { IBusinessProviderService } from './business/i-business-provider.service';


export interface IAccountsService {
  createAccount<T>(newAccount: NewAccount): Observable<ApiResponse<T>>;
}

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends ServiceBase implements IAccountsService {

  constructor(@Inject(BusinessProviderService) private businessProvider: IBusinessProviderService, loggingService: LoggingService, serviceContext: ServiceContext) {
    super('AccountsServiceService', loggingService, serviceContext);
    this.businessProvider.serviceContext = this.serviceContext;
  }

  createAccount<T>(newAccount: NewAccount): Observable<ApiResponse<T>> {
    return this.businessProvider.createAccount<T>(newAccount);
  }
}

export class AccountsServiceMock extends ServiceBase implements IAccountsService {
  createAccount<T>(newAccount: NewAccount): Observable<ApiResponse<T>> {
    if (!newAccount) {
      throw new Error(`The account data is not valid.`);
    }

    return of(new ApiResponse<T>());
  }
}
