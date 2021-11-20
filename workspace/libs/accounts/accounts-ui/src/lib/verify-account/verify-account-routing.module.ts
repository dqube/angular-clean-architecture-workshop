import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyAccountComponent } from './verify-account.component';

const routes: Routes = [{ path: '', component: VerifyAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyAccountRoutingModule { }
