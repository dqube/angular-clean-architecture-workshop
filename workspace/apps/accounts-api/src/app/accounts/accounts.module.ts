import { AccountsBLService, ApiAccountsBlModule, BusinessProviderService } from '@buildmotion/api/accounts-bl';
import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [ApiAccountsBlModule],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsBLService, BusinessProviderService]
})
export class AccountsModule { }
