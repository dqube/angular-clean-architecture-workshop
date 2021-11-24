/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, Body } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { NewAccount, NewAccountResponse } from '@buildmotion/accounts/types';
import { ApiResponse, ControllerBase } from '@buildmotion/types';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController extends ControllerBase {

  constructor(private accountsService: AccountsService) {
    super();
  }

  @Post()
  createAccount(@Body() account: NewAccount): Observable<ApiResponse<any>> {
    let response: ApiResponse<any> = new ApiResponse<any>();
    try {
      const result: NewAccountResponse = this.accountsService.createAccount(account);
      if (result) {
        response = this.handleSuccessResult<NewAccountResponse>(result, `Successfully created new account`);
      } else {
        response = this.handleFailureResult(`Failed to create new account`);
      }
    } catch (error) {
      console.error(error);
      response = this.handleFailureResult(`Failed to create new account`);
    }
    return of(response);
  }
}


