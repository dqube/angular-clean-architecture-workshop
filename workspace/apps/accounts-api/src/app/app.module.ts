import { Module } from '@nestjs/common';
import { AccountsController } from '../accounts/accounts.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { AccountsService } from '../accounts/accounts.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AccountsModule],
  controllers: [AppController, AccountsController],
  providers: [AppService, AccountsService],
})
export class AppModule {}
