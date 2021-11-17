# Nx Generators :: Schematic Tools to Scaffold

- [Nx Generators :: Schematic Tools to Scaffold](#nx-generators--schematic-tools-to-scaffold)
  - [Create Feature UI Component Library with Modules](#create-feature-ui-component-library-with-modules)
  - [Add Component Modules to Feature UI Library](#add-component-modules-to-feature-ui-library)
    - [UI Service for Component Module | Component Set](#ui-service-for-component-module--component-set)
  - [Domain Library](#domain-library)
  - [Domain Action](#domain-action)
  - [Domain Service](#domain-service)
  - [New Generator (a.k.a. Schematic) project.](#new-generator-aka-schematic-project)

Here is a sequence of implementation details that can implement a target domain feature.

1. create a [UI library](#create-feature-ui-component-library-with-modules) to implement a specific feature with UI/UX components
2. add top-level [feature components](#add-component-modules-to-feature-ui-library) to the UI library
   1. lazy-loaded route
3. add [UI service](#ui-service-for-component-module--component-set) for feature component(s)
4. create [domain library](#domain-library) to implement the business logic for a specific feature
   1. the UI services will use these domain libraries
5. add [business actions](#domain-action) to the domain library to implement discreet business logic items 

## Create Feature UI Component Library with Modules

Use the Nx CLI command to create an Angular Library project That contains UI elements for a specific domain feature.

> Common use is for a feature UI component library with Modules. Use the [module](#add-component-modules-to-feature-ui-library) template
> to add component/modules (SCAM) to the project.

```ts
nx generate @nrwl/angular:library --name=chat-ui --style=scss --directory=chat --importPath=@buildmotion/chat/chat-ui --lazy --linter=eslint --routing --simpleModuleName
nx generate @nrwl/angular:library --name=notifications --style=scss --directory=shared --importPath=@buildmotion/notifications --lazy --linter=eslint --routing --simpleModuleName
```

## Add Component Modules to [Feature UI Library](#create-feature-ui-component-library-with-modules)

The following is an example of adding a single-component with a module to an existing library project called *store*.

```ts
nx g @nrwl/angular:module --name=cart --project=store --module=/store.module --route=cart --routing --dry-run
nx g @nrwl/angular:module --name=products --project=store --module=/store.module --route=products --routing --dry-run
```

### UI Service for Component Module | Component Set

The `UI Service` is an essential part of the Angular CLEAN Architecture pattern. It is responsible for coordinating data and business logic operations between the UI/UX and the *domain service*.

> **Syntax**: nx workspace-schematic ui-service [name] --path=[to-component-folder] --project=[name-of-project]

| Option      | Description                                                                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [name]      | Indicate the simple name of the UI service. The schematic will append a `UIService` to the name (e.g., a name of "campaign-list" will create the class name *CampaignList**UIService***) |
| `path`    | Use to indicate the path to the component folder relative to the library's `src/lib` folder.                                                                                             |
| `project` | Use to provide the name of the library project. See the `nx.json` file for a list of project names or the `workspace.json` file.                                                                                                                                                                                         |

Here is a sample of running the Nx CLI generator command to create a new UI Service.

```ts
nx workspace-schematic ui-service campaignList --path=campaign-list --project=portal-campaigns
yarn run v1.22.10
$ relatient360/workspace/node_modules/.bin/tsc -p /relatient360/workspace/tools/tsconfig.generated.json
✨  Done in 2.10s.
>  NX  Executing your local schematic: ui-service
CREATE libs/portal/campaigns/src/lib/campaign-list/campaign-list-ui.service.ts (398 bytes)
```


## Domain Library

Adds to an existing library project. Use the [Domain Library](#domain-library) command to create a new domain library that includes a *domain service*.

```ts
nx workspace-schematic domain-library --directory=security --importPath=@buildmotion/security --name=security-service --dry-run
```

Output for CLI command:

```ts
nx workspace-schematic domain-library --directory=security --importPath=@buildmotion/security --name=security-service --dry-run
nx workspace-schematic domain-library --directory=shared --importPath=@buildmotion/notifications --name=notifications --dry-run
```

| Item                | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| nx                  | Name of the CLI                                                                         |
| workspace-schematic | Name of the Nx CLI package used to run Schematics or Generators                         |
| domain-library      | The name of the *custom* Schematic with templates and options.                          |
| --directory         | The *directory* option creates or uses a folder in *libs* for the new library project   |
| --importPath        | The *importPath* option creates the *@scope name and path* for the new library project. |
| --name              | The *name* option provides a unique name for the library project.                       |
| --dry-run           | The *dry-run* option allows you to run the CLI command without making any file changes. |


>  NX  Executing your local schematic: domain-library

```ts
nx workspace-schematic domain-library --directory=security --importPath=@buildmotion/security --name=security-service --dry-run

>  NX  Executing your local schematic: domain-library

? Which stylesheet format would you like to use? SASS(.scss)  [ http://sass-lang.com   ]
CREATE libs/security/security-service/README.md (174 bytes)
CREATE libs/security/security-service/tsconfig.lib.json (465 bytes)
CREATE libs/security/security-service/src/index.ts (47 bytes)
CREATE libs/security/security-service/src/lib/security-service.module.ts (171 bytes)
CREATE libs/security/security-service/tsconfig.json (200 bytes)
CREATE libs/security/security-service/jest.config.js (754 bytes)
CREATE libs/security/security-service/src/test-setup.ts (30 bytes)
CREATE libs/security/security-service/tsconfig.spec.json (236 bytes)
CREATE libs/security/security-service/.eslintrc.json (705 bytes)
CREATE libs/security/security-service/src/lib/security-service.service.ts (662 bytes)
CREATE libs/security/security-service/src/lib/business/business-provider.service.ts (1150 bytes)
CREATE libs/security/security-service/src/lib/business/http-security-service-repository.service.ts (1245 bytes)
CREATE libs/security/security-service/src/lib/business/i-business-provider.service.ts (251 bytes)
CREATE libs/security/security-service/src/lib/business/i-http-security-service-repository.service.ts (196 bytes)
CREATE libs/security/security-service/src/lib/business/actions/business-action-base.ts (1208 bytes)
UPDATE package.json (2831 bytes)
UPDATE workspace.json (13784 bytes)
UPDATE nx.json (1091 bytes)
UPDATE tsconfig.base.json (1562 bytes)
UPDATE jest.config.js (769 bytes)
```

## Domain Action

Use the following to create new Business Action classes in domain service libraries.

```ts
nx workspace-schematic domain-action "retrieveConversation" --project=chat-service
```

## Domain Service

Use to add a domain service with the backing `BusinessProvider`, Actions, and HTTP Repository for API calls.

> Adds to an existing library project. Use the [Domain Library](#domain-library) command to create a
> new domain library that includes a *domain service*.

```ts
nx workspace-schematic domain-service --name=<name-of-project> --project=state-machine --dry-run
```


## New Generator (a.k.a. Schematic) project.

```ts
nx generate @nrwl/workspace:workspace-generator my-generator
```
