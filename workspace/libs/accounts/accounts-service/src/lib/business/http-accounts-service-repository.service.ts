/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { NewAccount } from '@buildmotion/accounts/types';
import { ConfigurationService, IAPIConfig, IConfiguration } from '@buildmotion/configuration';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { HttpRequestMethod, HttpService } from '@buildmotion/http-service';
import { LoggingService, Severity } from '@buildmotion/logging';
import { Observable } from 'rxjs';
import { IHttpAccountsServiceRepositoryService } from './i-http-accounts-service-repository.service';

/**
 * Use this service to construct and execute HTTP/API requests for the application.
 *
 * A sample of an API setup and execution:
 *
 * ```ts
 *  performAccountsService<T>(someInput: string): Observable<any> {
 *   const requestUrl = `${this.configService.settings.appConfig.apiURL}VerifyMonitoredTerm`;
 *   this.loggingService.log(this.serviceName, Severity.Information, `Preparing to call API to... `);
 *   const options = this.httpService.createOptions(HttpRequestMethod.post, this.httpService.createHeader(), requestUrl, someInput, false);
 *   return this.httpService.execute(options);
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class HttpAccountsServiceRepositoryService extends ServiceBase implements IHttpAccountsServiceRepositoryService, IHttpAccountsServiceRepositoryService {
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

  createAccount<T>(newAccount: NewAccount): Observable<any> {
    const requestUrl = `${this.apiConfig.baseUrl}/accounts`;
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to call API to [${requestUrl}]`);
    const options = this.httpService.createOptions(HttpRequestMethod.post, this.httpService.createHeader(), requestUrl, newAccount, null, false);
    return this.httpService.executeObserveBody(options);
  }
}
