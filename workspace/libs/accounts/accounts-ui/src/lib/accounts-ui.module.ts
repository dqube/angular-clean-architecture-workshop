import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { ToasterNotifierComponent } from './notifiers/toaster-notifier/toaster-notifier.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'new-account', loadChildren: () => import('./new-account/new-account.module').then(m => m.NewAccountModule) },
      { path: 'verify-account', loadChildren: () => import('./verify-account/verify-account.module').then(m => m.VerifyAccountModule) },
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
      { path: 'logout', loadChildren: () => import('./logout/logout.module').then(m => m.LogoutModule) },
      { path: 'change-password', loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule) },
      { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) }
    ]),
  ],
  declarations: [
    PasswordStrengthComponent,
    ToasterNotifierComponent
  ],
  exports: [
    ToasterNotifierComponent
  ]
})
export class AccountsUiModule {}
