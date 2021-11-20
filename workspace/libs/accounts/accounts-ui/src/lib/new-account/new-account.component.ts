import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentBase } from '@buildmotion/foundation';
import { LoggingService, Severity } from '@buildmotion/logging';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ValidationService } from '@buildmotion/validation';

@Component({
  selector: 'buildmotion-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [ValidationService]
})
export class NewAccountComponent extends ComponentBase implements OnInit {

  form: FormGroup;

  private passwordValidators = [Validators.required, Validators.minLength(8), Validators.maxLength(128)];

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    loggingService: LoggingService,
    router: Router
  ) {
    super('NewAccountComponent', loggingService, router);
  }

  ngOnInit(): void {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to initialize component.`);
    this.initializeForm();
  }

  initializeForm() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to initialize the create account form.`);
    this.form = this.formBuilder.group({
      emailAddress: new FormControl(undefined, {
        validators: [Validators.required, Validators.maxLength(100)],
        asyncValidators: [
          // ADD ASYNC EMAIL VALIDATION HERE;
        ],
        updateOn: 'blur',
      }),
      password: new FormControl(undefined, {
        validators: [...this.passwordValidators],
        asyncValidators: [],
      }),
      passwordConfirm: new FormControl(undefined, {
        updateOn: 'change',
      }),
    });

    this.onPasswordValueChange();
  }

  /**
   * Use to coordinate changes in the password and password confirm inputs.
   */
  private onPasswordValueChange() {
    this.passwordConfirm.valueChanges.pipe(debounceTime(1), distinctUntilChanged()).subscribe(() => {
      this.passwordConfirm.setErrors(null);
    });
  }

  get emailAddress(): AbstractControl {
    return this.form.get('emailAddress') as FormControl;
  }

  get passwordConfirm(): AbstractControl {
    return this.form.get('passwordConfirm') as FormControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as FormControl;
  }

}
