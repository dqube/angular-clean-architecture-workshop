import { Inject, Injectable, OnDestroy } from '@angular/core';
import { LoggingService, Severity } from '@buildmotion/logging';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { ErrorResponse } from './models/error-response.model';
import { MessageType } from './models/MessageType';
import { ServiceContext } from './models/ServiceContext';
import { ServiceMessage } from './models/ServiceMessage';

/**
 * Use the [ServiceBase] to provide common behavior for Angular
 * services.
 */
// @Injectable(
//   {
//     providedIn: 'any'
//   }
// )

@Inject({})
export class ServiceBase implements OnDestroy {
  accessToken = '';
  id: string = Guid.create().toString();
  private subscriptions: Array<Subscription> = [];

  /**
   * Use the constructor to provide required elements to the base class.
   *
   * @param loggingService The [LoggingService] is a required dependency of this
   * class. It should be injected into any Angular Services that extend from
   * this base class. It will allow the members of the base class to log information
   * using the common LoggingService.
   */
  constructor(public serviceName: string, public loggingService: LoggingService, public serviceContext: ServiceContext) {
    // this.loggingService.log(this.serviceName, Severity.Information, `Initializing ${this.serviceName} at ${Date.now()} with id: ${this.id}`);
  }

  /**
   * Use to extract the contents of the HTTP body and return a JSON
   * representation of the data.
   * @param response: contains the HTTP response.
   */
  extractData(response: Response) {
    const body = response.json();
    return body || {};
  }

  /**
   * Use to handle an unexpected error in the application. The error should implement
   * the specified interface. The method will add a new [ServiceMessage] to the
   * specified [ServiceContext].
   * @param error An unexpected application error that implements the [Error] interface.
   *
   * interface Error {
   *  name: string;
   *  message: string;
   *  stack?: string;
   * }
   */
  handleUnexpectedError(error: Error): void {
    const message = new ServiceMessage(error.name, error.message).WithDisplayToUser(false).WithMessageType(MessageType.Error).WithSource(this.serviceName);

    const tags: string[] = [`${this.serviceName}`];
    const logItem = `${message.toString()}; ${error.stack}`;
    this.loggingService.log(this.serviceName, Severity.Error, logItem, tags);

    this.serviceContext.addMessage(message);
  }

  /**
   * Use to handle an error that contains a [name] and a [message].
   * @param error
   */
  handleError(error: { name: string; message: string | undefined }): void {
    const message = new ServiceMessage(error.name, error.message).WithDisplayToUser(false).WithMessageType(MessageType.Error).WithSource(this.serviceName);

    const tags: string[] = [`${this.serviceName}`];

    this.loggingService.log(this.serviceName, Severity.Error, message.toString(), tags);

    this.serviceContext.addMessage(message);
  }

  /**
   * Use to create a new [ErrorResponse] with the specified message.
   * @param message The message for the specified [ErrorResponse].
   */
  createErrorResponse(message: string): ErrorResponse {
    const response: ErrorResponse = new ErrorResponse();
    response.Message = message;
    return response;
  }

  /**
   * Use a generic method to finish service requests that return [Observables].
   * @param sourceName
   */
  finishRequest(sourceName: string): void {
    this.loggingService.log(this.serviceName, Severity.Information, `Request for [${sourceName}] by ${this.serviceName} is complete.`);
    if (this.serviceContext.hasErrors()) {
      this.loggingService.log(this.serviceName, Severity.Information, `Preparing to write any messages.`);
      this.serviceContext.Messages.filter((f) => f.MessageType === MessageType.Error && f.DisplayToUser).forEach((e) =>
        this.loggingService.log(this.serviceName, Severity.Error, e.toString())
      );
    }
  }

  logError(error: any, errorMessage: string) {
    this.loggingService.log(this.serviceName, Severity.Error, `${errorMessage}; Error: ${error.message}`);
  }

  ngOnDestroy(): void {
    this.unsubscribeAllSubscriptions()
  }

  /**
   * Use to reset the service context when you want to clear messages from the [ServiceContext]. If you want to
   * append messages from subsequent service calls, do not use this method.
   */
  resetServiceContext() {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to reset the Messages of the current [ServiceContext].`);
    if (this.serviceContext && this.serviceContext.Messages) {
      if (this.serviceContext.Messages.length > 0) {
        this.loggingService.log(this.serviceName, Severity.Information, `Resetting the Messages of the current [ServiceContext].`);
        this.serviceContext.Messages = new Array<ServiceMessage>();
      } else {
        this.loggingService.log(this.serviceName, Severity.Information, `The current [ServiceContext] does not contain any [Messages].`);
      }
    } else {
      this.loggingService.log(this.serviceName, Severity.Warning, `The current [ServiceContext] is not valid.`);
    }
    this.loggingService.log(this.serviceName, Severity.Information, `Finished  processing request to [reset] the Messages of the current [ServiceContext].`);
  }

  /**
   * Register a Subscription
   * @param subscription
   */
  subscribe(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  /**
   * Unsubscribe all Subjections
   */
  unsubscribeAllSubscriptions() {
    this.subscriptions.forEach((sub) => {
      if (sub && typeof sub.unsubscribe === 'function') {
        sub.unsubscribe();
      }
    })
  }

  /**
   * Use to write the current messages contained in the [ServiceContext]. Written messages are limited
   * to items that are marked as [DisplayToUser = true].
   */
  writeMessages() {
    if (this.serviceContext && this.serviceContext.Messages) {
      this.serviceContext.Messages.forEach((e) => {
        if (e.MessageType === MessageType.Error && e.DisplayToUser) {
          this.loggingService.log(this.serviceName, Severity.Error, e.toString());
        }
      });
    }
  }
}
