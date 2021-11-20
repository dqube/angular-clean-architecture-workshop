import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NewAccountRoutingModule } from './new-account-routing.module';
import { NewAccountComponent } from './new-account.component';

const routes: Routes = [
  { path: '', component: NewAccountComponent }
];

@NgModule({
  declarations: [
    NewAccountComponent
  ],
  imports: [
    CommonModule,
    NewAccountRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class NewAccountModule { }
