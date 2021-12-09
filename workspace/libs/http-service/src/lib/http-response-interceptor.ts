/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { ApiResponse } from '@buildmotion/types';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class HttpResponseInterceptor implements HttpInterceptor {
  displayToUser = true;
  doNotDisplayToUser = false;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.id && event.body.data) {
            return event;
          } else {
            // FIXME: WRAP API RESPONSE; REMOVE WHEN API RETURNS DATA IN PROPER FORMAT/SCHEMA;
            const apiResponse = new ApiResponse();
            apiResponse.data = event.body;
            apiResponse.message = 'API response wrapped by [HttpResponseInterceptor].';
            apiResponse.timestamp = new Date();
            apiResponse.isSuccess = this.determineResponseStatus(event.status);
            apiResponse.id = Guid.create().toString();

            // return the new response/wrapped;
            return event.clone({
              body: apiResponse
            })
          }
        }

        return event;
      })
    );
  }

  determineResponseStatus(status: number): boolean {
    if (status === 200) {
      return true;
    }
    return false;
  }
}
