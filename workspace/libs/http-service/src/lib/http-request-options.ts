import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpRequestMethod } from './http-request-methods.enum';

/**
 * Use to configure the HTTP options for a request.
 */
export class HttpRequestOptions {
  requestMethod = HttpRequestMethod.get;
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'response';
  params?: HttpParams | { [params: string]: string | string[] };
  reportProgress?: boolean;
  withCredentials?: boolean;
  requestUrl = '';
  responseType?: 'json';

  toString(): string {
    return `Method: ${this.requestMethod}`;
  }
}
