import { NewAccount, NewAccountResponse } from '@buildmotion/accounts/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  createAccount(account: NewAccount): NewAccountResponse {
    if (account && account.acceptTermsConditions) {
      return new NewAccountResponse();
    } else {
      throw new Error(`Failed to create account.`);
    }
  }
}
