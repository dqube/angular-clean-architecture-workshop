import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@buildmotion/foundation';
import { LoggingService, Severity } from '@buildmotion/logging';

@Component({
  selector: 'buildmotion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ComponentBase {

  constructor(
    loggingService: LoggingService,
    router: Router
  ) {
    super('AppComponent', loggingService, router);

    this.loggingService.log(this.componentName, Severity.Error, `Just doing some exceptional programming here..., right?`);
  }
}
