/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ConfigurationService } from '@buildmotion/configuration';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { HttpRequestMethod, HttpService } from '@buildmotion/http-service';
import { LoggingService, Severity } from '@buildmotion/logging';
import { IHttpApplicationInfoRepositoryService } from './i-http-application-info-repository.service';

@Injectable({
  providedIn: 'root',
})
export class HttpApplicationInfoRepositoryService extends ServiceBase implements IHttpApplicationInfoRepositoryService {
  constructor(private httpService: HttpService, private configService: ConfigurationService, loggingService: LoggingService, serviceContext: ServiceContext) {
    super('HttpApplicationInfoRepositoryService', loggingService, serviceContext);
  }

  retrieveApplicationInfo(): any {
    const requestUrl = `${this.configService.settings.apiConfig.version}`;
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to call API to retrieve application information with ${requestUrl}.`);
    const options = this.httpService.createOptions(HttpRequestMethod.get, this.httpService.createHeader(), requestUrl, null, false);
    return this.httpService.execute(options);
  }
}
