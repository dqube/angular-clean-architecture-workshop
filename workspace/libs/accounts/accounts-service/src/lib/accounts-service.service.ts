import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { LoggingService } from '@buildmotion/logging';
import { Inject, Injectable } from '@angular/core';
import { BusinessProviderService } from './business/business-provider.service';
import { NewAccount } from '@buildmotion/accounts/types';
import { ApiResponse } from '@buildmotion/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends ServiceBase {

  constructor(@Inject(BusinessProviderService) private businessProvider: BusinessProviderService, loggingService: LoggingService, serviceContext: ServiceContext) {
    super('AccountsServiceService', loggingService, serviceContext);
    this.businessProvider.serviceContext = this.serviceContext;
  }

  createAccount<T>(newAccount: NewAccount): Observable<ApiResponse<T>> {
    return this.businessProvider.createAccount<T>(newAccount);
  }
}
