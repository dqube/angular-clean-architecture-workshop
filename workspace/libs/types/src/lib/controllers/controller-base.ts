/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiMessage } from '@buildmotion/types';
import { Guid } from 'guid-typescript';
import { ApiResponse } from "../api/api-response";

/**
 * Use the ControllerBase to implement common/shared Controller
 * methods/operations.
 */
export class ControllerBase {

  /**
    * Use to create a failure response.
    *
    * @param message A message to send to the caller/consumer of the API endpoint.
    * @returns an ApiResponse without any data payload.
    */
  public wrapFailureResult(message: string, messages?: ApiMessage[]): ApiResponse<null> {
    const apiResponse: ApiResponse<null> = new ApiResponse<null>();
    apiResponse.data = null;
    apiResponse.id = Guid.create().toString();
    apiResponse.isSuccess = false;
    apiResponse.message = message;
    apiResponse.messages = messages;
    apiResponse.timestamp = new Date();

    return apiResponse;
  }

  /**
   * Use to create a success response for the API endpoint.
   * @param result the data payload for the response.
   * @param message A success message for the caller/consumer of the API
   * @returns an ApiResponse object with data (when applicable).
   */
  public wrapSuccessResult<T>(result: any, message: string, messages?: ApiMessage[]): ApiResponse<T> {
    const apiResponse: ApiResponse<T> = new ApiResponse<T>();
    apiResponse.data = result;
    apiResponse.id = Guid.create().toString();
    apiResponse.isSuccess = true;
    apiResponse.message = message;
    apiResponse.messages = messages;
    apiResponse.timestamp = new Date();

    return apiResponse
  }
}
