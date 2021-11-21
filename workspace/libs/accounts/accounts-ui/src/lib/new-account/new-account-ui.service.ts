import { Injectable } from '@angular/core';
import { LoggingService, Severity } from '@buildmotion/logging';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { NewAccount, NewAccountResponse } from '@buildmotion/accounts/types';
import { AccountsService } from '@buildmotion/accounts/accounts-service'
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '@buildmotion/common';

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
      (response) => this.handleCreateAccountResponse<NewAccountResponse>(response),
      (error) => this.handleCreateAccountError(error),
      () => this.finishCreateAccount()
    );
  }

  private handleCreateAccountResponse<T>(response: ApiResponse<T>): void {
    if (response) {
      if (response.isSuccess) {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to handle successful response for [create account].`);
      } else {
        this.loggingService.log(this.serviceName, Severity.Warning, `Preparing to handle failed/unsuccessful response for [create account].`);
        // TODO: HANDLE ANY [unsuccess] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
      }
    } else {
      this.loggingService.log(this.serviceName, Severity.Warning, `Received unexpected null/undefined response for [create account].`);
      // TODO: HANDLE ANY ERROR MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    }
  }

  private handleCreateAccountError(error: Error): void {
    // TODO: HANDLE ANY [error] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    this.handleError(error);
  }

  private finishCreateAccount(): void {
    // TODO: HANDLE ANY [finish] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    this.loggingService.log(this.serviceName, Severity.Information, `Finished processing request to [create account].`);
  }
}
