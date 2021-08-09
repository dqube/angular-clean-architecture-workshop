# Setup

## Create New Workspace

 Using the Nx CLI to create a new workspace will create the workspace using the latest version of the Nrwl package. To target a specific package version you want to go to [npmjs.com](npmjs.com) to determine the specific version number you want to use.

> https://www.npmjs.com/package/@nrwl/angular

![https://www.npmjs.com/package/@nrwl/angular](resources/setup/npmjs-nrwl-angular.png)

We will target version 11 for our new workspace. Use the *npx* command to create an empty workspace for our projects.

> npx create-nx-workspace@11.6.3 workspace --npm-scope=buildmotion

The output of the CLI command should look similar to the output listed below.

```ts
npx create-nx-workspace@11.6.3 workspace --npm-scope=buildmotion
npx: installed 66 in 2.68s
? What to create in the new workspace empty             [an empty workspace with a layout that works best for building apps]
? Use Nx Cloud? (It's free and doesn't require registration.) No

>  NX  Nx is creating your workspace.

  To make sure the command works reliably in all environments, and that the preset is applied correctly,
  Nx will run "npm install" several times. Please wait.


>  NX   SUCCESS  Nx has successfully created the workspace.
```

asdf

```json
{
  "name": "workspace",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "nx": "nx",
    "start": "nx serve",
    "build": "nx build",
    "test": "nx test",
    "lint": "nx workspace-lint && nx lint",
    "e2e": "nx e2e",
    "affected:apps": "nx affected:apps",
    "affected:libs": "nx affected:libs",
    "affected:build": "nx affected:build",
    "affected:e2e": "nx affected:e2e",
    "affected:test": "nx affected:test",
    "affected:lint": "nx affected:lint",
    "affected:dep-graph": "nx affected:dep-graph",
    "affected": "nx affected",
    "format": "nx format:write",
    "format:write": "nx format:write",
    "format:check": "nx format:check",
    "update": "nx migrate latest",
    "workspace-generator": "nx workspace-generator",
    "dep-graph": "nx dep-graph",
    "help": "nx help"
  },
  "private": true,
  "dependencies": {
    "tslib": "^2.0.0"
  },
  "devDependencies": {
    "@nrwl/tao": "11.6.3",
    "@nrwl/cli": "11.6.3",
    "@nrwl/workspace": "11.6.3",
    "@types/node": "14.14.33",
    "dotenv": "8.2.0",
    "ts-node": "~9.1.1",
    "typescript": "~4.0.3",
    "prettier": "2.2.1"
  }
}
```