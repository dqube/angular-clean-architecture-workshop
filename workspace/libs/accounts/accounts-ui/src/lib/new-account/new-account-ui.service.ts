import { Injectable } from '@angular/core';
import { LoggingService, Severity } from '@buildmotion/logging';
import { ServiceBase, ServiceContext } from '@buildmotion/foundation';
import { NewAccount, NewAccountResponse } from '@buildmotion/accounts/types';
import { AccountsService } from '@buildmotion/accounts/accounts-service'
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '@buildmotion/types';
import { Notification, NotificationService, NotificationSeverity, NotifierType } from '@buildmotion/notifications';

@Injectable()
export class NewAccountUIService extends ServiceBase {
  private isErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isReadySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isSendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isSuccessSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly isError$: Observable<boolean> = this.isErrorSubject.asObservable();
  public readonly isReady$: Observable<boolean> = this.isReadySubject.asObservable();
  public readonly isSending$: Observable<boolean> = this.isSendingSubject.asObservable();
  public readonly isSuccess$: Observable<boolean> = this.isSuccessSubject.asObservable();

  constructor(
    private accountsService: AccountsService,
    private notificationService: NotificationService,
    loggingService: LoggingService, serviceContext: ServiceContext) {
    super('NewAccountUIService', loggingService, serviceContext);
  }

  createAccount(newAccount: NewAccount) {
    this.isErrorSubject.next(false);
    this.isReadySubject.next(false);
    this.isSendingSubject.next(true);
    this.isSuccessSubject.next(false);

    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create new account for [${newAccount.emailAddress ?? 'n/a'}]`);
    this.accountsService.createAccount<NewAccountResponse>(newAccount).subscribe(
      (response) => this.handleCreateAccountResponse<NewAccountResponse>(response),
      (error) => this.handleCreateAccountError(error),
      () => this.finishCreateAccount()
    );
  }

  /**
   * Use to reset the UI/form state to default.
   */
  reset() {
    this.isErrorSubject.next(false);
    this.isReadySubject.next(true);
    this.isSendingSubject.next(false);
    this.isSuccessSubject.next(false);
  }

  private handleCreateAccountResponse<T>(response: ApiResponse<T>): void {
    if (response) {
      if (response.isSuccess) {
        this.isSuccessSubject.next(true);
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to handle successful response for [create account].`);
        const notice = new Notification('Great news..', 'Your account is created. Or, something...', NotifierType.Toast, NotificationSeverity.success);
        this.notificationService.addMessage(notice);
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
    this.isErrorSubject.next(true);
    this.handleError(error);
  }

  /**
   * Use to finish the API call. This method should be called at the end of every
   * handling of an API operation.
   */
  private finishCreateAccount(): void {
    // TODO: HANDLE ANY [finish] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    this.isSendingSubject.next(false);
    this.loggingService.log(this.serviceName, Severity.Information, `Finished processing request to [create account].`);
  }
}
