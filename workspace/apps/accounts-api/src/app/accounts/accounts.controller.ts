/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewAccount, NewAccountResponse } from '@buildmotion/accounts/types';
import { ApiMessage, ApiMessageType, ControllerBase } from '@buildmotion/types';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';


@Controller('accounts')
export class AccountsController extends ControllerBase {

  constructor(private accountsService: AccountsService) {
    super();
  }

  @ApiResponse({ type: 'NewAccount', status: HttpStatus.CREATED, description: 'Created new account.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Error while processing request to create new account.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to create account.' })
  @Post()
  async addAccount(@Body() accountDto: NewAccount, @Res() response: any) {
    try {
      const newContactResponse: NewAccountResponse = await this.accountsService.createAccount(accountDto);
      this.addCorsToHeader(response);
      if (newContactResponse && this.accountsService) {
        const messages: ApiMessage[] = [{ code: 'ACCOUNT_CREATE', message: 'We successfully created your account. Please check your email to verify.', messageType: ApiMessageType.Information }];
        const successResult = this.wrapSuccessResult(newContactResponse, `Successfully created new account for ${newContactResponse.userId}`, messages);
        return response.status(HttpStatus.CREATED).json({
          ...successResult
        });
      } else {
        const messages: ApiMessage[] = [{ code: 'ACCOUNT_FAILURE', message: 'Failed to create new account', messageType: ApiMessageType.Error }];
        const failureResult = this.wrapFailureResult('Failed to create new account.', messages);
        return response.status(HttpStatus.BAD_REQUEST).json({
          ...failureResult
        });
      }
    } catch (error) {
      const message = `Error while attempting to create new account`;
      const messages: ApiMessage[] = [{ code: 'ACCOUNT_ERROR', message: 'Unexpected error while attempting to create new account', messageType: ApiMessageType.Error }];
      const errorResult = this.wrapFailureResult(message, messages);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ...errorResult
      });
    }
  }

  private addCorsToHeader(response: any) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  }
}
