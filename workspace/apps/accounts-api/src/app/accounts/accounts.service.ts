import { NewAccount } from '@buildmotion/accounts/types';
import { AccountsBLService } from '@buildmotion/api/accounts-bl';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  constructor(
    private blService: AccountsBLService) {

  }

  createAccount<T>(account: NewAccount): T {
    return this.blService.createAccount<T>(account);
  }
}
