import { Module } from '@nestjs/common';
import { AccountsBLService } from './accounts-bl.service';
import { BusinessProviderService } from './business/business-provider.service';

@Module({
  controllers: [],
  providers: [AccountsBLService, BusinessProviderService],
  exports: [],
})
export class ApiAccountsBlModule { }
