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

  // shared password validators;
  private passwordValidators = [Validators.required, Validators.minLength(8), Validators.maxLength(128)];

  // inputs for the [PasswordStrength] indicator
  hasEightChars: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChars: boolean;
  hasUppercase: boolean;
  isMedium: boolean;
  isStrong: boolean;
  isWeak: boolean;
  withoutEightChars: boolean;
  withoutLowercase: boolean;
  withoutNumber: boolean;
  withoutSpecialChar: boolean;
  withoutUppercase: boolean;
  strength: number;


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

  onSubmit(): void {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to process form submission.`);
    this.markFormAsTouched(this.form);
    this.validatePasswordsMatch();

    if (this.form.valid) {
      this.loggingService.log(this.componentName, Severity.Information, `Simulate [create account]...`);
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
          // ADD ASYNC EMAIL VALIDATION HERE;
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

    this.password.valueChanges.pipe(debounceTime(150)).subscribe(() => {
      if (this.password.value === '') {
        this.resetStrengthIndicators();
      } else {
        this.determinePasswordStrength(this.password.value);
      }
    });
  }

  /**
   * Use to determine the strength of the password based on the password requirements.
   * @param password
   */
  private determinePasswordStrength(password: string) {
    this.strength = [
      this.validatePasswordLowercase(password),
      this.validatePasswordMinLength(password),
      this.validatePasswordNumeric(password),
      this.validatePasswordSpecialCharacter(password),
      this.validatePasswordUppercase(password),
    ].filter((item) => item !== false).length;

    this.loggingService.log(this.componentName, Severity.Information, `Preparing to set password strength: ${this.strength}`);

    this.isWeak = false;
    this.isMedium = false;
    this.isStrong = false;

    // update the progress/meter to indicate strength
    if (this.strength === 5) {
      this.isWeak = true;
      this.isMedium = true;
      this.isStrong = true;
    }
    if (this.strength >= 3) {
      this.isWeak = true;
      this.isMedium = true;
    }
    if (this.strength >= 1 && this.strength < 3) {
      this.isWeak = true;
    }
    if (this.strength < 1) {
      this.isWeak = false;
      this.isMedium = false;
      this.isStrong = false;
    }
  }

  private resetStrengthIndicators() {
    this.hasEightChars = false;
    this.hasLowercase = false;
    this.hasNumber = false;
    this.hasSpecialChars = false;
    this.hasUppercase = false;

    this.isMedium = false;
    this.isStrong = false;
    this.isWeak = false;

    this.withoutEightChars = false;
    this.withoutLowercase = false;
    this.withoutNumber = false;
    this.withoutSpecialChar = false;
    this.withoutUppercase = false;
  }

  private validatePasswordLowercase(value: string): boolean {
    const isValid = this.validationService.hasLowercase(value);
    this.hasLowercase = isValid;
    if (this.withoutLowercase && isValid) {
      this.withoutLowercase = false;
    }
    return isValid;
  }

  private validatePasswordMinLength(value: string): boolean {
    const isValid = this.validationService.StringMinLengthIsValid(value, 8);
    this.hasEightChars = isValid;
    if (this.withoutEightChars && isValid) {
      this.withoutEightChars = false;
    }
    return isValid;
  }

  private validatePasswordNumeric(value: string): boolean {
    const isValid = this.validationService.hasNumber(value);
    this.hasNumber = isValid;
    if (this.withoutNumber && isValid) {
      this.withoutNumber = false;
    }
    return isValid;
  }

  private validatePasswordSpecialCharacter(value: string): boolean {
    const isValid = this.validationService.hasSpecialCharacters(value);
    this.hasSpecialChars = isValid;
    if (this.withoutSpecialChar && isValid) {
      this.withoutSpecialChar = false;
    }
    return isValid;
  }

  private validatePasswordUppercase(value: string): boolean {
    const isValid = this.validationService.hasUppercase(value);
    this.hasUppercase = isValid;
    if (this.withoutUppercase && isValid) {
      this.withoutUppercase = false;
    }
    return isValid;
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
