import { NewAccount } from '@buildmotion/accounts/types';
import { Injectable } from '@nestjs/common';
import { CreateAccountAction } from './actions/create-account.action';

@Injectable()
export class BusinessProviderService {
  createAccount<T>(account: NewAccount): T {
    const action = new CreateAccountAction<T>(account);
    action.Do({ ...this });
    return action.response;
  }
}
