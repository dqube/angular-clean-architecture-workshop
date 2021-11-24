import { Injectable } from '@angular/core';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { ConfigurationService } from '@buildmotion/configuration';
import { HttpService } from '@buildmotion/http-service';
import { LoggingService } from '@buildmotion/logging';
import { Observable, of } from 'rxjs';
import { IHttpApplicationInfoRepositoryService } from './i-http-application-info-repository.service';
import { ApplicationInfo } from '../application-info.model';
import { ApiResponse } from '@buildmotion/types';

@Injectable({
  providedIn: 'root',
})
export class HttpApplicationInfoRepositoryMockService extends ServiceBase implements IHttpApplicationInfoRepositoryService {
  constructor(private httpService: HttpService, private configService: ConfigurationService, loggingService: LoggingService, serviceContext: ServiceContext) {
    super('HttpApplicationInfoRepositoryMockService', loggingService, serviceContext);
  }

  retrieveApplicationInfo<T>(): Observable<any> {
    const appInfoData = new ApplicationInfo();
    appInfoData.application = 'TheNgApp';
    appInfoData.version = '1.0.0';

    const apiResponse = new ApiResponse();
    apiResponse.data = appInfoData;
    apiResponse.isSuccess = true;

    return of(apiResponse);
  }
}
