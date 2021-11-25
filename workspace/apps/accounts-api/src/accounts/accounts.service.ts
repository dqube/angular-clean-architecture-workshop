import { NewAccount, NewAccountResponse } from '@buildmotion/accounts/types';
import { Injectable } from '@nestjs/common';
import { Guid } from 'guid-typescript';

@Injectable()
export class AccountsService {
  createAccount(account: NewAccount): NewAccountResponse {
    // FIXME: NEED REAL VALIDATION AND BUSINESS RULES --> SIMULATES RULE EVALUATION
    if (account && account.acceptTermsConditions) {
      // FIXME: UPDATE TO USE REAL DATABASE --> SIMULATES DATA ACCESS;
      const result: NewAccountResponse = new NewAccountResponse();
      result.accountId = '1234';
      result.emailAddress = account.emailAddress;
      result.userId = Guid.create().toString();

      return result;
    } else {
      throw new Error(`Failed to create account.`);
    }
  }
}
