import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentBase } from '@buildmotion/foundation';
import { LoggingService, Severity } from '@buildmotion/logging';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ValidationService } from '@buildmotion/validation';
import { NewAccountUIService } from './new-account-ui.service';
import { NewAccount } from '@buildmotion/accounts/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'buildmotion-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [ValidationService]
})
export class NewAccountComponent extends ComponentBase implements OnInit {

  public readonly isError$: Observable<boolean> = this.uiService.isError$;
  public readonly isReady$: Observable<boolean> = this.uiService.isReady$;
  public readonly isSending$: Observable<boolean> = this.uiService.isSending$;
  public readonly isSuccess$: Observable<boolean> = this.uiService.isSuccess$;

  form: FormGroup;

  // shared password validators;
  private passwordValidators = [Validators.required, Validators.minLength(8), Validators.maxLength(128)];

  constructor(
    private uiService: NewAccountUIService,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    loggingService: LoggingService,
    router: Router
  ) {
    super('NewAccountComponent', loggingService, router);
  }

  ngOnInit(): void {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to initialize component.`);
    this.uiService.reset();
    this.initializeForm();
  }

  onSubmit(): void {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to process form submission.`);
    this.markFormAsTouched(this.form);
    this.validatePasswordsMatch();

    if (this.form.valid) {
      this.loggingService.log(this.componentName, Severity.Information, `Simulate [create account]...`);
      const newAccount: NewAccount = { ...this.form.value };
      this.uiService.createAccount(newAccount);
    } else {
      this.loggingService.log(this.componentName, Severity.Warning, `The create account form is not valid.`);
      this.passwordConfirm.setValidators(null);
    }
  }

  private initializeForm() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to initialize the create account form.`);
    this.form = this.formBuilder.group({
      emailAddress: new FormControl(undefined, {
        validators: [Validators.required, Validators.maxLength(100)],
        asyncValidators: [
          this.validationService.EmailAddressFormat
        ],
        updateOn: 'blur',
      }),
      password: new FormControl(undefined, {
        validators: [...this.passwordValidators],
        asyncValidators: [this.validationService.PasswordStrength],
        updateOn: 'blur'
      }),
      passwordConfirm: new FormControl(undefined, {
        updateOn: 'change',
      }),
      acceptTermsConditions: new FormControl(undefined, {
        validators: [Validators.required]
      })
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

  /**
 * Use to set validators and errors for matching passwords.
 */
  private validatePasswordsMatch() {
    this.passwordConfirm.setValidators([...this.passwordValidators]);
    this.passwordConfirm.updateValueAndValidity();
    this.validatePasswordConfirmMatch();
  }

  private validatePasswordConfirmMatch() {
    if (!(this.password.value === this.passwordConfirm.value)) {
      this.passwordConfirm.setErrors({
        passwordMismatch: true,
      });
    }
  }

  get acceptTermsConditions(): AbstractControl {
    return this.form.get('acceptTermsConditions') as FormControl;

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
