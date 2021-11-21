import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NewAccountRoutingModule } from './new-account-routing.module';
import { NewAccountComponent } from './new-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewAccountUIService } from './new-account-ui.service';
import { AccountsService } from '@buildmotion/accounts/accounts-service';

const routes: Routes = [
  { path: '', component: NewAccountComponent }
];

@NgModule({
  declarations: [
    NewAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewAccountRoutingModule,
    RouterModule.forChild(routes)
  ],
  providers: [AccountsService, NewAccountUIService]
})
export class NewAccountModule { }
