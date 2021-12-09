import { ApiMessage } from './api-message';
import { ApiMessageType } from './api-message-type.enum';

export class ApiErrorMessage extends ApiMessage {
  /**
   * Use to create a new [ApiErrorMessage].
   *
   * @param message The error from the API.
   * @param code An optional identifier for the error.
   */
  constructor(message: string, code: string | null) {
    super();
    this.messageType = ApiMessageType.Error;
    this.message = message;
    if (code) {
      this.code = code;
    }
  }
}
