import { NewAccount } from '@buildmotion/accounts/types';
import { Injectable } from '@nestjs/common';
import { BusinessProviderService } from './business/business-provider.service';

@Injectable()
export class AccountsBLService {
  constructor(
    private businessProvider: BusinessProviderService
  ) { }
  createAccount<T>(account: NewAccount): T {
    return this.businessProvider.createAccount<T>(account);
  }
}
