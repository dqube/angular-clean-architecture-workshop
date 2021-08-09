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