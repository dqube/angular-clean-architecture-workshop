import { ApiMessageType } from './api-message-type.enum';

/**
 * Use this class to define messages for the application. The source of the message
 * may be the server API or even the application domain. The default
 * [message type] is [Information] if not specified (e.g., Warning, Error).
 */
export class ApiMessage {
  /**
   * Use code to map to i18n or other displayable messages.
   *
   * Examples: [SearchTermTooLarge, EmailFormatError, OutOfRange]
   */
  code: string;

  /**
   * Use only for client-logging; not user message (i18n)
   *
   * Note: Consider refactor to not use.
   */
  message?: string;

  /**
   * Use to indicate the message type (i.e., Information, Warning, or Error).
   */
  messageType: ApiMessageType;

  constructor(code?: string, messageType?: ApiMessageType);
  constructor(code: string, messageType?: ApiMessageType);
  constructor(code: string, messageType: ApiMessageType = ApiMessageType.Information) {
    code ? (this.code = code) : (this.code = '');
    messageType ? (this.messageType = messageType) : (this.messageType = ApiMessageType.Information); //default;
  }
}
