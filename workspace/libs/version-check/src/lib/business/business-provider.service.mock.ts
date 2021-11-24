import { Injectable, Inject } from '@angular/core';
import { ConfigurationService } from '@buildmotion/configuration';
import { LoggingService } from '@buildmotion/logging';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { Observable } from 'rxjs';
import { IBusinessProviderService } from './i-business-provider.service';
import { HttpApplicationInfoRepositoryService } from './http-application-info-repository.service';
import { RetrieveApplicationInfoAction } from './actions/retrieve-application-info.action';
import { ApiResponse } from '@buildmotion/types';
@Injectable({
  providedIn: 'root',
})
export class BusinessProviderServiceMock extends ServiceBase implements IBusinessProviderService {
  constructor(
    @Inject(HttpApplicationInfoRepositoryService) public apiService: HttpApplicationInfoRepositoryService,
    serviceContext: ServiceContext,
    public configService: ConfigurationService,
    loggingService: LoggingService
  ) {
    super('BusinessProviderService', loggingService, serviceContext);
  }

  retrieveApplicationInfo<T>(): Observable<ApiResponse<T>> {
    const action = new RetrieveApplicationInfoAction<T>();
    action.Do(this);
    return action.response;
  }
}
