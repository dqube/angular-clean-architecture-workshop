import { Injectable } from '@angular/core';
import { LoggingService, Severity } from '@buildmotion/logging';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { NewAccount, NewAccountResponse } from '@buildmotion/accounts/types';
import { AccountsService } from '@buildmotion/accounts/accounts-service'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NewAccountUIService extends ServiceBase {

  private isSendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isSending$: Observable<boolean> = this.isSendingSubject.asObservable();

  constructor(
    private accountsService: AccountsService,
    loggingService: LoggingService, serviceContext: ServiceContext) {
    super('NewAccountUIService', loggingService, serviceContext);
  }

  createAccount(newAccount: NewAccount) {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create new account for [${newAccount.emailAddress ?? 'n/a'}]`);
    this.accountsService.createAccount<NewAccountResponse>(newAccount).subscribe(
      // (response) => this.handleCreateAccountResponse<NewAccountResponse>(response),
      // (error) => this.handleCreateAccountError(error),
      // () => this.finishCreateAccount()
    );
  }
}
