import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { LoggingService } from '@buildmotion/logging';
import { AccountsService } from '@buildmotion/accounts/accounts-service';
import { HttpService } from '@buildmotion/http-service';
import { HttpClient } from '@angular/common/http';

const routes: Route[] = [
  {
    path: 'accounts',
    loadChildren: () => import('@buildmotion/accounts/accounts-ui').then((m) => m.AccountsUiModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [LoggingService, AccountsService, HttpService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule { }
