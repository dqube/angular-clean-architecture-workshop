import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { VerifyAccountRoutingModule } from './verify-account-routing.module';
import { VerifyAccountComponent } from './verify-account.component';

const routes: Routes = [
  { path: '', component: VerifyAccountComponent }
];

@NgModule({
  declarations: [
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    VerifyAccountRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class VerifyAccountModule { }
