import { ServiceResponse } from './service-response.model';

export class ErrorResponse extends ServiceResponse {
  Exception!: Error;

  constructor() {
    super();
    this.IsSuccess = false;
  }
}
