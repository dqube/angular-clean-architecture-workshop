# Outline

## Getting Started

- Node
- Visual Studio Code
- Git
- AWS

## Workshop Repository

git clone https://github.com/buildmotion/angular-clean-architecture-workshop.git

git checkout 1_setup/add-angular-application    
git checkout 1_setup/create-nx-workspace
git checkout 2_setup/add-code-to-x-concern-libs 
git checkout 2_setup/add-cross-cutting-libraries
git checkout 3_app/configure-application
git checkout 4_tools/generators-and-schematics
git checkout 5_accounts/create-ui-library
git checkout 5-2/accounts/add-new-account-form

## Create Nx Workspace

- [ ] create new Nx workspace

## Generate Applications

- [ ] [generate applications](./new-application.md#add-new-angular-application)
- [ ] generate applications
  - [ ] dashboard: client application to manage application settings
    - [ ] add `reference` application
  - [ ] admin: private/internal application to configure and manage clients
  - [ ] client: public facing application for customers.

## Generate Library Projects

- [ ] add library projects
  - [ ] add source code to library projects

## Add Cross-Cutting Concerns to Application

- [ ] configure `dashboard` application with cross-cutting concerns
  - [ ] [add module](cross-cutting-concern-libraries.md)
  - [ ] add providers

## Add Generators/Schematics to Workspace

- [ ] add Nx generators/schematics to workspace tools
  - [ ] app-component
  - [ ] domain-action
  - [ ] domain-library
  - [ ] domain-service
  - [ ] ui-service

## Generate [Accounts] Library Project(s)

- [ ] generate `accounts-ui` library project

```ts
nx generate @nrwl/angular:library --name=accounts-ui --style=scss --directory=accounts --importPath=@buildmotion/accounts/accounts-ui --lazy --linter=eslint --routing --simpleModuleName
```

- [ ] create a default target module to load when the module is lazy-loaded by an application route.

```ts
nx g @nrwl/angular:module --name=home --project=accounts-ui --module=/accounts-ui.module --route=home --routing --dry-run -d
```

- [ ] update component template
- [ ] add route to the application; lazy-load accounts-ui module

## Add [Account] Component(s)

```ts
nx g @nrwl/angular:module --name=new-account      --project=accounts-ui --module=/accounts-ui.module --routing --route=new-account 
nx g @nrwl/angular:module --name=verify-account   --project=accounts-ui --module=/accounts-ui.module --routing --route=verify-account 
nx g @nrwl/angular:module --name=login            --project=accounts-ui --module=/accounts-ui.module --routing --route=login
nx g @nrwl/angular:module --name=logout           --project=accounts-ui --module=/accounts-ui.module --routing --route=logout
nx g @nrwl/angular:module --name=change-password  --project=accounts-ui --module=/accounts-ui.module --routing --route=change-password
nx g @nrwl/angular:module --name=forgot-password  --project=accounts-ui --module=/accounts-ui.module --routing --route=forgot-password
nx g @nrwl/angular:component --name=password-strength --project=accounts-ui --module=/accounts-ui.module -d
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

- [ ] implement submit on the component

## [Accounts] Domain Library for Business Logic

- [ ] generate `accounts-service` library project
## [Accounts] Domain Library for Business Logic

- [ ] generate `accounts-api` project
  - [ ] add pre-requisite packages
  - [ ] add `healthCheck` endpoint
    - [ ] module
    - [ ] controller
    - [ ] service
    - [ ] verify with Postman

- [ ] update application configuration with `healthCheck` URL endpoint
  - [ ] local/development environment configuration
- [ ] generate `create-account` component module with routes in `client` application project
  - [ ] update navigation/menu to target route
  - [ ] generate `ui-service` for the `create-account` component
- [ ] implement the `healthCheck` API call from the account ui service
  - [ ] implement call to `AccountsService`
  - [ ] implement call to `BusinessProvider`
  - [ ] implement call to `HealthCheckAction`
  - [ ] implement call to `HttpAccountsRepository`
  - [ ] handle responses with *Subject/Observables* (use Snippets)
    - [ ] `isLoading$`
    - [ ] `isHealthy$`
    - [ ] `isError$`
  - [ ] update HTML template to use `async Observables`
- [ ] add Reactive form to the `create-account` component
  - [ ] add `FormGroup` to component with form definition and validators
  - [ ] define model for the information
  - [ ] generate shared `types` project for the domain
    - [ ] add `new-account.model.ts` to the library (shared)
    - [ ] update barrel file (i.e, index.ts)
  - [ ] implement `submit()` operation
    - [ ] verifies valid form
    - [ ] calls `ui-service` to `createAccount`
  - [ ] implement the `createAccount` API call from the account ui service
    - [ ] implement call to `AccountsService`
    - [ ] implement call to `BusinessProvider`
    - [ ] implement call to `createAccountAction`
    - [ ] implement call to `HttpAccountsRepository`
      - [ ] return mock API response
- [ ] add API endpoint in `accounts-api` project to handle `POST` of account information
  - [ ] implement `createAccount` operation in controller
  - [ ] implement `createAccount operation in service
  - [ ] add database repository service
  - [ ] implement `createAccount` in database repository
    - [ ] insert data into database
  - [ ] ??? consider implementing a tunnel to the database for the local API endpoint to interact with and use the AWS hosted database (Postgres)
    - [ ] add database (Postgres relational) or consider DynamoDb (NoSql)
    - [ ] configure pgAdmin
- [ ] Add Serverless Configuration for application(s)
  - [ ] client
  - [ ] accounts-api