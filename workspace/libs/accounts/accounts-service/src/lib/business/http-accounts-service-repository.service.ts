import { ConfigurationService, IAPIConfig, IConfiguration } from '@buildmotion/configuration';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { HttpRequestMethod, HttpService } from '@buildmotion/http-service';
import { LoggingService, Severity } from '@buildmotion/logging';
import { Injectable } from '@angular/core';
import { IHttpAccountsServiceRepositoryService } from './i-http-accounts-service-repository.service';
import { NewAccount } from '@buildmotion/accounts/types';
import { Observable } from 'rxjs';
import { ApiResponse } from '@buildmotion/common';

@Injectable({
  providedIn: 'root',
})
export class HttpAccountsServiceRepositoryService extends ServiceBase implements IHttpAccountsServiceRepositoryService {

  apiConfig: IAPIConfig;

  constructor(private httpService: HttpService, private configService: ConfigurationService, loggingService: LoggingService, serviceContext: ServiceContext) {
    super('HttpAccountsServiceRepositoryService', loggingService, serviceContext);
    this.configService.settings$.subscribe((settings: IConfiguration) => this.handleSettings(settings));
  }

  private handleSettings(settings: IConfiguration): void {
    if (settings && settings.apiConfig) {
      this.apiConfig = settings.apiConfig;
    }
  }

  // performAccountsService<T>(someInput: string): Observable<any> {
  //   const requestUrl = `${this.configService.settings.appConfig.apiURL}VerifyMonitoredTerm`;
  //   this.loggingService.log(this.serviceName, Severity.Information, `Preparing to call API to... `);
  //   const options = this.httpService.createOptions(HttpRequestMethod.post, this.httpService.createHeader(), requestUrl, someInput, false);
  //   return this.httpService.execute(options);
  // }

  createAccount<T>(newAccount: NewAccount): Observable<ApiResponse<T>> {
    const requestUrl = `${this.apiConfig.baseUrl}/accounts`;
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to call API to...${requestUrl}`);
    const options = this.httpService.createOptions(HttpRequestMethod.post, this.httpService.createHeader(), requestUrl, newAccount, false);
    return this.httpService.execute(options);
  }
}
