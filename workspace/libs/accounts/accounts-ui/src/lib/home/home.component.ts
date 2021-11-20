import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@buildmotion/foundation'
import { LoggingService, Severity } from '@buildmotion/logging';

@Component({
  selector: 'buildmotion-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends ComponentBase implements OnInit {

  constructor(loggingService: LoggingService, router: Router) {
    super('Accounts.HomeComponent', loggingService, router);
  }

  ngOnInit(): void {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to initialize accounts home.`);
  }

}
