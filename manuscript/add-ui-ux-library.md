# Add UI/UX library

## Setup Accounts UI Library

> git checkout 5_accounts/create-ui-library

### Generate [Accounts] Library Project(s)

- [ ] generate `accounts-ui` library project

```ts
nx generate @nrwl/angular:library --name=accounts-ui --style=scss --directory=accounts --importPath=@buildmotion/accounts/accounts-ui --lazy --linter=eslint --routing --simpleModuleName
```

- [ ] create a default target module to load when the module is lazy-loaded by an application route.

```ts
nx g @nrwl/angular:module --name=home --project=accounts-ui --module=/accounts-ui.module --route=home --routing --dry-run -d
```

- [ ] update component template

```html
<!-- libs/accounts/accounts-ui/src/lib/home/home.component.html -->
<div class=" content">
  <div class=" row">
    <!-- ADD STUFF FOR ROW 1 -->
    <h1>Home works</h1>
  </div>
  <div class=" row">
    <!-- ADD STUFF HERE FOR ROW 2 -->
    <h4>More stuff here...</h4>
  </div>
</div>

```

### Update Route to the Library Module (Library)

- [ ] add route to the application; lazy-load accounts-ui module

```ts
// apps/black-dashboard/src/app/app-routing.module.ts
{
  path: 'accounts',
  loadChildren: () => import('@buildmotion/accounts/accounts-ui').then((m) => m.AccountsUiModule)
}
```

- [ ] Update the side bar menu

```ts
// apps/black-dashboard/src/app/components/sidebar/sidebar.component.ts
  {
    path: '/accounts',
    title: 'Accounts',
    type: 'link',
    icontype: 'tim-icons icon-chart-pie-36',
    rtlTitle: ''
  }
```

### Add [Account] Component(s)

```ts
nx g @nrwl/angular:module --name=new-account      --project=accounts-ui --module=/accounts-ui.module --routing --route=new-account 
nx g @nrwl/angular:module --name=verify-account   --project=accounts-ui --module=/accounts-ui.module --routing --route=verify-account 
nx g @nrwl/angular:module --name=login            --project=accounts-ui --module=/accounts-ui.module --routing --route=login
nx g @nrwl/angular:module --name=logout           --project=accounts-ui --module=/accounts-ui.module --routing --route=logout
nx g @nrwl/angular:module --name=change-password  --project=accounts-ui --module=/accounts-ui.module --routing --route=change-password
nx g @nrwl/angular:module --name=forgot-password  --project=accounts-ui --module=/accounts-ui.module --routing --route=forgot-password
```

- [ ] add new single component module to create new account (e.g., new-account)
  - [ ] use CLI: 
- [ ] extends ComponentBase
- [ ] add reactive form to the component
  - [ ] update template with form and inputs
  - [ ] initialize FormGroup with configuration and validation of controls


Add Validation Service

- [ ] add `ValidationService`

```ts
nx g @nrwl/angular:service --name=validation --project=validation -d
```


Generate a new library to share data types between Angular and NestJS projects:

```ts
nx g @nrwl/workspace:library accounts/types
```

## Add New Account Form (Component Setup)

> - git checkout 5-2/accounts/add-new-account-form

1. add `form: FromGroup` to the component
2. inject `FormBuilder` into the constructor
3. update component class to implement `OnInit`
4. add `this.initializeForm()` to the `ngOnInit()` method.
5. initialize form using `FormBuilder`
   1. set each control that will collect information

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentBase } from '@buildmotion/foundation';
import { LoggingService, Severity } from '@buildmotion/logging';

@Component({
  selector: 'buildmotion-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent extends ComponentBase implements OnInit {

  form: FormGroup;

  // shared password validators;
  private passwordValidators = [Validators.required, Validators.minLength(8), Validators.maxLength(128)];

  constructor(
    private formBuilder: FormBuilder,
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
        validators: {...this.passwordValidators},
        updateOn: 'change',
      }),
    });
  }
}
```

- [ ] add getters for the form control items

```ts
  get emailAddress(): AbstractControl {
    return this.form.get('emailAddress') as FormControl;
  }

  get passwordConfirm(): AbstractControl {
    return this.form.get('passwordConfirm') as FormControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as FormControl;
  }
```

- [ ] update the `NewAccountModule` to import:

1. FormsModule
2. ReactiveFormsModule

```ts
// libs/accounts/accounts-ui/src/lib/new-account/new-account.module.ts
@NgModule({
  declarations: [
    NewAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewAccountRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class NewAccountModule { }
```

## Update New Account Template

> git checkout 5-3/accounts/add-new-account-template

```html
<!-- libs/accounts/accounts-ui/src/lib/new-account/new-account.component.html -->
<div class="content">
  <div class="row">
    <!-- REGISTER/CREATE ACCOUNT -->
    <div class="col-md-6">
      <form id="RegisterValidation" [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="bv-content">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Register Form</h4>
          </div>
          <div class="card-body">
            <!-- EMAIL ADDRESS -->
            <div class="form-group has-label" [ngClass]="{
                'has-danger': !form.valid && emailAddress.touched && emailAddress.invalid,
                'has-success': form.valid && emailAddress.touched && emailAddress.valid
              }">
              <label> Email Address * </label>
              <input class="form-control" name="email" formControlName="emailAddress" type="email" />
              <label class="error" *ngIf="!form.valid && emailAddress.touched && emailAddress.hasError('required')">The email address is required.</label>
              <label class="error" *ngIf="!form.valid && emailAddress.touched && emailAddress.hasError('maxlength')">The email address max length is 100 characters.</label>
              <label class="error" *ngIf="!form.valid && emailAddress.touched && emailAddress.hasError('invalidEmailAddress')">The email address format is not valid.</label>
            </div>

            <!-- PASSWORD -->
            <div class="form-group has-label" [ngClass]="{
                'has-danger': !form.valid && password.touched && password.invalid,
                'has-success': form.valid && password.touched && password.valid
              }">
              <label> Password * </label>
              <input class="form-control" id="registerPassword" formControlName="password" name="password" required=""
                type="password" />
              <label class="error" *ngIf="!form.valid && password.touched && password.hasError('required')">This password is required.</label>
              <label class="error" *ngIf="!form.valid && password.touched && password.hasError('minlength')">This password minimum length is 8 characters.</label>
              <label class="error" *ngIf="!form.valid && password.touched && password.hasError('maxlength')">This password max length is 128 characters.</label>
              <label class="error" *ngIf="!form.valid && password.touched && password.hasError('PasswordStrength')">This password strength is not valid - must have alpha, numeric, and special characters!</label>
              
            </div>

            <!-- PASSWORD CONFIRM -->
            <div class="form-group has-label" [ngClass]="{
                'has-danger': !form.valid && passwordConfirm.touched && passwordConfirm.invalid,
                'has-success': form.valid && passwordConfirm.touched && passwordConfirm.valid
              }">
              <label> Confirm Password * </label>
              <input 
                class="form-control" 
                formControlName="passwordConfirm" 
                id="registerPasswordConfirmation"
                name="password_confirmation" 
                type="password" />
              <label class="error" *ngIf="!form.valid && passwordConfirm.touched && passwordConfirm.hasError('required')">This confirmation password is required.</label>
              <label class="error" *ngIf="!form.valid && passwordConfirm.touched && passwordConfirm.hasError('passwordMismatch')">This passwords do not match.</label>
            </div>
            <div class="category form-category">* Required fields</div>
          </div>
          <div class="card-footer text-right">
            <div class="form-check pull-left">
              <label class="form-check-label">
                <input class="form-check-input" formControlName="acceptTermsConditions" name="optionCheckboxes" type="checkbox" />
                <span class="form-check-sign"> </span> Accept the terms and conditions
              </label>
              <label class="error" *ngIf="acceptTermsConditions.touched && acceptTermsConditions.hasError('required')">You must accept the terms and conditions.</label>
            </div>
            <button class="btn btn-danger" type="submit">Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row">
    <!-- ADD STUFF HERE FOR ROW 2 -->
  </div>
</div>
```

### Form

- `formGroup` matches the name of the property in the component
- `onSubmit()` handler for the `ngSubmit` event/click 

```html
  <form id="RegisterValidation" [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="bv-content">
```

### Input Template

- label changes display when invalid
- input `formControlName` value matches name of control in FormBuilder setup
- error message displays when the form, input and error criteria evaluate to error state

```html
<!-- EMAIL ADDRESS -->
<div class="form-group has-label" [ngClass]="{
    'has-danger': !form.valid && emailAddress.touched && emailAddress.invalid,
    'has-success': form.valid && emailAddress.touched && emailAddress.valid
  }">
  <label> Email Address * </label>
  <input class="form-control" name="email" formControlName="emailAddress" type="email" />
  <label class="error" *ngIf="!form.valid && emailAddress.touched && emailAddress.hasError('required')">The email address is required.</label>
  <label class="error" *ngIf="!form.valid && emailAddress.touched && emailAddress.hasError('maxlength')">The email address max length is 100 characters.</label>
  <label class="error" *ngIf="!form.valid && emailAddress.touched && emailAddress.hasError('invalidEmailAddress')">The email address format is not valid.</label>
</div>
```

## Account UI Service

> git checkout 5-4/accounts/new-accounts-ui-service

- [ ] implement submit on the component

> NOTE: NEED TO INSTALL
> - [ ] @angular-devkit/core@11.2.0
> - [ ] Update workspace.json version to "1"
> See: https://nx.dev/l/n/core-concepts/configuration#version
> When the version of workspace.json is set to 2, targets, generators and executor properties are used instead of the version 1 properties architect, schematics and builder.

```ts
nx workspace-schematic ui-service new-account --path=new-account --project=accounts-ui -d
CREATE libs/accounts/accounts-ui/src/lib/new-account/new-account-ui.service.ts (392 bytes)
```

- [ ] Update the component to use the new UI service in the `onSubmit()` method.

```ts
const newAccount: NewAccount = { ...this.form.value };
this.uiService.createAccount(newAccount);
```

- [ ] inject the UI Service in the constructor of the component

```ts
// libs/accounts/accounts-ui/src/lib/new-account/new-account.component.ts
 private uiService: NewAccountUIService,
 ```

- [ ] Update the UI Service to include a `createAccount()` method to handle the request

```ts
// libs/accounts/accounts-ui/src/lib/new-account/new-account-ui.service.ts
import { NewAccount, NewAccountResponse } from '@buildmotion/accounts/types';
import { AccountsService } from '@buildmotion/accounts/accounts-service'

@Injectable()
export class NewAccountUIService extends ServiceBase {

  private isSendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isSending$: Observable<boolean> = this.isSendingSubject.asObservable();

  constructor(
    private accountsService: AccountsService,
    loggingService: LoggingService, serviceContext: ServiceContext) {
    super('NewAccountUIService', loggingService, serviceContext);
  }

  createAccount(newAccount: NewAccount) {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create new account for [${newAccount.emailAddress ?? 'n/a'}]`);
    // this.accountsService.createAccount<NewAccountResponse>(newAccount).subscribe(
      // (response) => this.handleCreateAccountResponse<NewAccountResponse>(response),
      // (error) => this.handleCreateAccountError(error),
      // () => this.finishCreateAccount()
    );
  }
}
```