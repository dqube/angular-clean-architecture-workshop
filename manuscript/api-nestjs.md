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