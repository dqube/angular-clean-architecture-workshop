# Add UI/UX library

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
- [ ] add route to the application; lazy-load accounts-ui module

### Add [Account] Component(s)

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

### UI Service

- [ ] implement submit on the component
- [ ] add UI Service

> NOTE: NEED TO INSTALL
> - [ ] @angular-devkit/core@11.2.0
> - [ ] Update workspace.json version to "1"
> See: https://nx.dev/l/n/core-concepts/configuration#version
> When the version of workspace.json is set to 2, targets, generators and executor properties are used instead of the version 1 properties architect, schematics and builder.

```ts
nx workspace-schematic ui-service new-account --path=new-account --project=accounts-ui -d
CREATE libs/accounts/accounts-ui/src/lib/new-account/new-account-ui.service.ts (392 bytes)
```

Generate a new library to share data types between Angular and NestJS projects:

```ts
nx g @nrwl/workspace:library accounts/types
```
