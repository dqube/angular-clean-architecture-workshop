# API: NestJS

## Generate NestJS Project

> git checkout 7-1/accounts/add-api-project

- [ ] add pre-requisite packages: `yarn add -D @nrwl/nest@11.6.3`
- [ ] generate `accounts-api` project using CLI

```ts
nx g @nrwl/nest:application accounts-api -d
```

## Add API Controller

> git checkout 7-2/accounts/add-accounts-controller

- [ ] Add module, controller, and service for the API project.

```ts
nx g @nrwl/nest:module accounts --project=accounts-api
nx g @nrwl/nest:controller accounts --project=accounts-api -d
nx g @nrwl/nest:service accounts --project=accounts-api -d
```

## Integrate Accounts API with Application

> git checkout 7-3/accounts/integrate-accounts-api

## API Debugging Tools

> git checkout 7-4/accounts/api-debugging-tools


Crete a new shared/workspace library for common types between API and application projects.

```ts
nx g @nrwl/workspace:library accounts/types -d
```

> Fix tests and linting errors

Integrate application to use the API.

- update configuration
- update HTTP repository to use new endpoint (not mock)

Request payload should be:

```json
{"emailAddress":"joe@email.com","password":"..Joe2021","passwordConfirm":"..Joe2021","acceptTermsConditions":true}
```

Response:

```json
{
    "isSuccess": true,
    "message": "Successfully created new account",
    "messages": [],
    "timestamp": "2021-11-24T21:31:17.575Z",
    "data": {},
    "id": "9e2035d0-5d12-6531-082f-862b1e8c595d"
}
```

### Attach to API

> Launch API: https://blog.davidjs.com/2021/05/debugging-nestjs-app-in-nrwl-nx-workspace/
> NodeJS debugging: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

```json
 {
    // debug: https://blog.davidjs.com/2021/05/debugging-nestjs-app-in-nrwl-nx-workspace/
    "name": "Accounts API Launch",
    "type": "pwa-node",
    "request": "launch",
    "args": [
        "apps/accounts-api/src/main.ts"
    ], // Path to main entry file
    "runtimeArgs": [
        "--require",
        "ts-node/register",
        "--require",
        "tsconfig-paths/register",
        "--experimental-modules"
    ],
    "cwd": "${workspaceRoot}",
    "trace": true,
    "restart": true,
    "internalConsoleOptions": "openOnSessionStart",
    "env": {
        "NODE_ENV": "local",
        "NODE_PORT": "3333",
        "TS_NODE_PROJECT": "apps/accounts-api/tsconfig.app.json", // Specify the tsconfig to use. See content of it below.
        "IS_DEBUG_MODE": "true" // Custom env variable to detect debug mode
    },
    "sourceMaps": true,
    "console": "internalConsole",
    "outputCapture": "std",
    "resolveSourceMapLocations": [
        "${workspaceFolder}/**",
        "!**/node_modules/**" // Disable the "could not read source map" error for node_modules
    ]
    }
```

## Domain Service Layer (Business Logic)

Create a new library project for the NestJS API application. Allows us to encapsulate the business logic - and provide an API to the consumer/controller (via facade pattern).

```ts
nx g @nrwl/nest:library accounts-bl --directory api

nx g @nrwl/nest:service lib/accounts-bl --project=api-accounts-bl --flat   
CREATE libs/api/accounts-bl/src/lib/accounts-bl.service.spec.ts
CREATE libs/api/accounts-bl/src/lib/accounts-bl.service.ts
UPDATE libs/api/accounts-bl/src/lib/api-accounts-bl.module.ts
```

### Business Logic

```ts
nx g @nrwl/nest:service lib/business/businessProvider --project=api-accounts-bl --flat  
CREATE libs/api/accounts-bl/src/lib/business/business-provider.service.spec.ts
CREATE libs/api/accounts-bl/src/lib/business/business-provider.service.ts
UPDATE libs/api/accounts-bl/src/lib/api-accounts-bl.module.ts
```

Create Action

```ts
nx workspace-schematic domain-action "createAccount" --project=api-accounts-bl
yarn run v1.22.10
warning ../../../../package.json: No license field
$ /Users/valencia/work/github/angular-clean-architecture-workshop/workspace/node_modules/.bin/tsc -p /Users/valencia/work/github/angular-clean-architecture-workshop/workspace/tools/tsconfig.generated.json
✨  Done in 1.00s.

>  NX  Executing your local schematic: domain-action

CREATE libs/api/accounts-bl/src/lib/business/actions/create-account.action.spec.ts (207 bytes)
CREATE libs/api/accounts-bl/src/lib/business/actions/create-account.action.ts (1134 bytes)
```

> NX  Executing your local schematic: domain-action

> Error: Invalid format version detected - Expected:[ 1 ] Found: [ 2 ]
>     at Object.readJsonWorkspace (/Users/valencia/work/github/angular-clean-architecture-workshop/> workspace/node_modules/@angular-devkit/core/src/workspace/json/reader.js:31:15)
>     at processTicksAndRejections (internal/process/task_queues.js:97:5)
>     at async Object.readWorkspace (/Users/valencia/work/github/> angular-clean-architecture-workshop/workspace/node_modules/@angular-devkit/core/src/> workspace/core.js:90:25)
>     at async getWorkspace (/Users/valencia/work/github/angular-clean-architecture-workshop/> workspace/node_modules/@schematics/angular/utility/workspace.js:53:27)
>     at async Object.createDefaultPath (/Users/valencia/work/github/> angular-clean-architecture-workshop/workspace/node_modules/@schematics/angular/utility/> workspace.js:68:23)

Fix: 

```ts
const formatVersion = versionNode.value.value;
if (formatVersion !== 1) {
    // throw new Error(`Invalid format version detected - Expected:[ 1 ] Found: [ ${formatVersion} ]`);
}
```

Business Action Base

```ts
nx g @nrwl/nest:class lib/business/actions/businessActionBase --project=api-accounts-bl --flat
CREATE libs/api/accounts-bl/src/lib/business/actions/business-action-base.spec.ts
CREATE libs/api/accounts-bl/src/lib/business/actions/business-action-base.ts
```