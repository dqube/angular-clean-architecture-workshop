/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "../api/api-response";
import { Guid } from 'guid-typescript';

export class ControllerBase {
  /**
    * Use to create a failure response.
    *
    * @param message A message to send to the caller/consumer of the API endpoint.
    * @returns an ApiResponse without any data payload.
    */
  public handleFailureResult(message: string) {
    const apiResponse: ApiResponse<null> = new ApiResponse<null>();
    apiResponse.data = null;
    apiResponse.id = Guid.create().toString();
    apiResponse.isSuccess = false;
    apiResponse.message = message;
    apiResponse.messages = [];
    apiResponse.timestamp = new Date();

    return apiResponse;
  }

  /**
   * Use to create a success response for the API endpoint.
   * @param result the data payload for the response.
   * @param message A success message for the caller/consumer of the API
   * @returns an ApiResponse object with data (when applicable).
   */
  public handleSuccessResult<T>(result: any, message: string) {
    const apiResponse: ApiResponse<T> = new ApiResponse<T>();
    apiResponse.data = result;
    apiResponse.id = Guid.create().toString();
    apiResponse.isSuccess = true;
    apiResponse.message = message;
    apiResponse.messages = [];
    apiResponse.timestamp = new Date();

    return apiResponse;
  }
}
