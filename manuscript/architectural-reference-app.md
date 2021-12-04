- [Architecture Reference Application](#architecture-reference-application)
  - [3rd-Party Components](#3rd-party-components)
  - [Application Modules](#application-modules)
    - [Application Module (AppModule)](#application-module-appmodule)
    - [Application Routing](#application-routing)
    - [Shared Module](#shared-module)
    - [Core Module](#core-module)
    - [Site Module](#site-module)
  - [Application Template Setup](#application-template-setup)
    - [Package Updates](#package-updates)
    - [Angular.json Configuration](#angularjson-configuration)
    - [Assets](#assets)
    - [Index.html](#indexhtml)
  - [Site-Level Components](#site-level-components)
    - [Home (Landing Page)](#home-landing-page)
  - [Application Features](#application-features)
    - [Feature Route Configuration](#feature-route-configuration)
    - [Application Routing Configuration (Lazy-Loading)](#application-routing-configuration-lazy-loading)
  - [Core Services (Business Domain Logic)](#core-services-business-domain-logic)
    - [Core Domain Library](#core-domain-library)
      - [Angular.json Project Configuration](#angularjson-project-configuration)
      - [TSConfig Path Configuration](#tsconfig-path-configuration)
    - [Generate a Core Domain Service](#generate-a-core-domain-service)
    - [Generate Business Provider](#generate-business-provider)
    - [Core Domain Service Setup](#core-domain-service-setup)
    - [Business Provider Implementation](#business-provider-implementation)
    - [Actions](#actions)
      - [Business Action Base](#business-action-base)
      - [Business Action Base](#business-action-base-1)
      - [Action Framework Class](#action-framework-class)
    - [Business Action Implementation](#business-action-implementation)
      - [Business Repository](#business-repository)
      - [Business Action with Rules](#business-action-with-rules)
    - [Service Context](#service-context)
    - [Service Messages](#service-messages)
      - [Service Message with Constructor](#service-message-with-constructor)
      - [Service Message with Fluent-API](#service-message-with-fluent-api)
      - [Message Types](#message-types)
    - [API Response](#api-response)
      - [Api Message](#api-message)
      - [Base API Response](#base-api-response)
      - [Success](#success)
      - [Error](#error)

# Architecture Reference Application

Source/GitHub.com: [black-dashboard-angular](https://github.com/creativetimofficial/black-dashboard-angular)

Use the CLI to create a new project in the workspace.

```ts
ng generate application architecture-reference --routing
```

The output of the `generate application` command:

```ts
ng generate application architecture-reference --routing
? What framework would you like to use for the application? Angular         [ https://angular.io   ]
? In which directory should the application be generated?
? Which Unit Test Runner would you like to use for the application? Jest   [ https://jestjs.io ]
? Which E2E Test Runner would you like to use for the application? Cypress       [ https://www.cypress.io ]
? Which tags would you like to add to the application? (used for linting)
CREATE apps/architecture-reference/tsconfig.json (123 bytes)
CREATE apps/architecture-reference-e2e/tsconfig.json (126 bytes)
CREATE apps/architecture-reference-e2e/tsconfig.e2e.json (188 bytes)
CREATE apps/architecture-reference-e2e/cypress.json (590 bytes)
CREATE apps/architecture-reference-e2e/src/fixtures/example.json (80 bytes)
CREATE apps/architecture-reference-e2e/src/integration/app.spec.ts (238 bytes)
CREATE apps/architecture-reference-e2e/src/plugins/index.ts (685 bytes)
CREATE apps/architecture-reference-e2e/src/support/app.po.ts (47 bytes)
CREATE apps/architecture-reference-e2e/src/support/commands.ts (838 bytes)
CREATE apps/architecture-reference-e2e/src/support/index.ts (599 bytes)
CREATE apps/architecture-reference/browserslist (388 bytes)
CREATE apps/architecture-reference/tsconfig.app.json (221 bytes)
CREATE apps/architecture-reference/tslint.json (185 bytes)
CREATE apps/architecture-reference/src/favicon.ico (5430 bytes)
CREATE apps/architecture-reference/src/index.html (334 bytes)
CREATE apps/architecture-reference/src/main.ts (375 bytes)
CREATE apps/architecture-reference/src/polyfills.ts (2839 bytes)
CREATE apps/architecture-reference/src/styles.scss (80 bytes)
CREATE apps/architecture-reference/src/assets/.gitkeep (0 bytes)
CREATE apps/architecture-reference/src/environments/environment.prod.ts (52 bytes)
CREATE apps/architecture-reference/src/environments/environment.ts (663 bytes)
CREATE apps/architecture-reference/src/app/app.module.ts (406 bytes)
CREATE apps/architecture-reference/src/app/app.component.html (597 bytes)
CREATE apps/architecture-reference/src/app/app.component.spec.ts (1094 bytes)
CREATE apps/architecture-reference/src/app/app.component.ts (227 bytes)
CREATE apps/architecture-reference/src/app/app.component.scss (0 bytes)
CREATE apps/architecture-reference/tsconfig.spec.json (262 bytes)
CREATE apps/architecture-reference/jest.config.js (283 bytes)
CREATE apps/architecture-reference/src/test-setup.ts (30 bytes)
UPDATE angular.json (33494 bytes)
UPDATE package.json (7900 bytes)
UPDATE nx.json (1031 bytes)
UPDATE tslint.json (1996 bytes)
```

## 3rd-Party Components

We will use a 3rd-party component library to implement components in the application. 

[Github.com: IgniteUI/igniteui-angular](https://github.com/IgniteUI/igniteui-angular)

## Application Modules

### Application Module (AppModule)

The quarterback of the application. Coordinates all of the other players (modules).

> Note: The `APP_BASE_HREF` configuration to provide the base HREF value to the application.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CoreModule } from './modules/core/core.module';
import { RouterModule } from '@angular/router';
import { SiteModule } from './modules/site/site.module';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  exports: [],
  imports: [BrowserModule, CoreModule, RouterModule, SiteModule, AppRoutingModule],
  providers: [
    {
      provide: APP_BASE_HREF, //use to configure/provide the base URL portion;
      useValue: '/',
    },
  ],
})
export class AppModule {}
```

### Application Routing

Requires a routing module for the application's top-level route definitions. Use the CLI to create a new module for the routing.

```ts
ng g module appRouting --project=architecture-reference
CREATE apps/architecture-reference/src/app/app-routing/app-routing.module.ts (194 bytes)
```

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

The *AppModule* will need to import the routing module to enable the routes for the application.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

### Shared Module

The *SharedModule* is container for other modules that will be shared and used within your application project and by other feature modules. Typically, we are putting generalized Angular and 3rd-party modules. It is not a requirement, but more of a convention and convenience for organizing these module imports. 

> Note: CoreModule will contain modules that are specific to the application's domain and features.

```ts
ng g module modules/shared --project=architecture-reference
CREATE apps/architecture-reference/src/app/modules/shared/shared.module.ts (190 bytes)
```

Here is a sample *SharedModule* with a list of module imports that will be shared in the application.

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const MODULES = [
    BrowserAnimationsModule, 
    CommonModule, 
    FormsModule, 
    HttpClientModule, 
    NgbModule, 
    RouterModule, 
    ToastrModule
];

@NgModule({
  declarations: [],
  exports: [...MODULES],
  imports: [...MODULES],
})
export class SharedModule {}

```

### Core Module

The *CoreModule* provides an code-organizational convention to provide domain-specific modules for the application.

Also, since we are inspecting and requiring a single instance of this module, this would be a good location to provide any singleton/globally-scoped services for the application.

```ts
ng g module modules/core --project=architecture-reference
CREATE apps/architecture-reference/src/app/modules/core/core.module.ts (188 bytes)
```

A sample *CoreModule* ready for any domain-specific items.

```ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only.`);
    }
  }
}
```

### Site Module

The *SiteModule* is a convenience container module for items that are not domain-specific. Common components, pipes and directives.

> Note: If any of these items are candidates for reuse, consider implementing the item in the *Component* library project instead.

```ts
ng g module modules/site --project=architecture-reference
CREATE apps/architecture-reference/src/app/modules/site/site.module.ts (188 bytes)
```

After we setup the application template and components, the *SiteModule* contains the declarations for these non-domain components. 

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
      FooterComponent, 
      HomeComponent,
      NavbarComponent, 
      SidebarComponent, 
      ],
  imports: [CommonModule, SharedModule],
})
export class SiteModule {}

```


## Application Template Setup

The reference application will use a template with pre-defined components, layout, and styles.

### Package Updates
- [ ] compare package.json to determine what packages need to be installed.
  - [ ] may need to compare versions as well; some package(s) may have dependencies on a specific Angular version
- [ ] update the target package.json file with dependency package
- [ ] run `yarn install`


```ts
yarn install
yarn install v1.15.2
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.9: The platform "win32" is incompatible with this module.
info "fsevents@1.2.9" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning " > @angular/platform-server@7.2.15" has unmet peer dependency "@angular/http@7.2.15".
warning " > @ng-bootstrap/ng-bootstrap@4.2.1" has incorrect peer dependency "rxjs@^6.3.0".
warning " > ngx-file-drop@6.0.1" has incorrect peer dependency "rxjs@^6.3.3".
warning "@nrwl/builders > license-webpack-plugin@1.5.0" has unmet peer dependency "webpack-sources@>=1.0.0".
warning " > ng-packagr@4.2.0" has incorrect peer dependency "typescript@^2.7.0 || ~3.0.1".
warning " > tsickle@0.35.0" has incorrect peer dependency "typescript@~3.4.1".
[4/4] Building fresh packages...

success Saved lockfile.
warning Your current version of Yarn is out of date. The latest version is "1.19.1", while you're on "1.15.2".
info To upgrade, download the latest installer at "https://yarnpkg.com/latest.msi".
Done in 8.27s.
```

### Angular.json Configuration

* assets
* scripts
* styles

```json
"assets": [
    "apps/architecture-reference/src/favicon.ico", 
    "apps/architecture-reference/src/assets"],
"styles": [
    "apps/architecture-reference/src/styles.scss",
    "node_modules/ngx-toastr/toastr.css",
    "apps/architecture-reference/src/assets/scss/black-dashboard.scss",
    "apps/architecture-reference/src/assets/css/nucleo-icons.css"
],
"scripts": [],
```

### Assets

Update the project with the application *assets* from the source template. 

### Index.html

Update the application project with the *index.html* from the source template. Run the application to verify it is working.

```ts
ng serve architecture-reference
```

```html
<!--
 =========================================================
 * Black Dashboard Angular - v1.0.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard-angular
 * Copyright 2019 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->
<!DOCTYPE html>
<html lang="en">
    <!-- <base href="/" /> -->
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="./assets/img/apple-icon.png"
    />
    <link rel="icon" type="image/png" href="./assets/img/favicon.png" />
    <title>Black Dashboard Angular by Creative Tim</title>
    <!--     Fonts and icons     -->
    <link
      href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800"
      rel="stylesheet"
    />
    <link
      href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"
      rel="stylesheet"
    />
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>

  </head>
  <body>
    <tc-root></tc-root>
  </body>
</html>
```

## Site-Level Components


* footer
* navbar
* sidebar

```ts
ng g component modules/site/footer --project=architecture-reference
CREATE apps/architecture-reference/src/app/modules/site/footer/footer.component.html (25 bytes)
CREATE apps/architecture-reference/src/app/modules/site/footer/footer.component.spec.ts (628 bytes)
CREATE apps/architecture-reference/src/app/modules/site/footer/footer.component.ts (269 bytes)
CREATE apps/architecture-reference/src/app/modules/site/footer/footer.component.scss (0 bytes)
UPDATE apps/architecture-reference/src/app/modules/site/site.module.ts (264 bytes)

ng g component modules/site/navbar --project=architecture-reference
CREATE apps/architecture-reference/src/app/modules/site/navbar/navbar.component.html (25 bytes)
CREATE apps/architecture-reference/src/app/modules/site/navbar/navbar.component.spec.ts (628 bytes)
CREATE apps/architecture-reference/src/app/modules/site/navbar/navbar.component.ts (269 bytes)
CREATE apps/architecture-reference/src/app/modules/site/navbar/navbar.component.scss (0 bytes)
UPDATE apps/architecture-reference/src/app/modules/site/site.module.ts (342 bytes)

ng g component modules/site/sidebar --project=architecture-reference
CREATE apps/architecture-reference/src/app/modules/site/sidebar/sidebar.component.html (26 bytes)
CREATE apps/architecture-reference/src/app/modules/site/sidebar/sidebar.component.spec.ts (635 bytes)
CREATE apps/architecture-reference/src/app/modules/site/sidebar/sidebar.component.ts (273 bytes)
CREATE apps/architecture-reference/src/app/modules/site/sidebar/sidebar.component.scss (0 bytes)
UPDATE apps/architecture-reference/src/app/modules/site/site.module.ts (424 bytes)
```

### Home (Landing Page)

The application will have a default landing page as entry point into the application. This will provide the ability to: 

* navigate to different features
* manage/show messages to users
* limit/show feature options based on the user's authentication or authorization status.

```ts
ng g component modules/site/home --project=architecture-reference
CREATE apps/architecture-reference/src/app/modules/site/home/home.component.html (23 bytes)
CREATE apps/architecture-reference/src/app/modules/site/home/home.component.spec.ts (614 bytes)
CREATE apps/architecture-reference/src/app/modules/site/home/home.component.ts (261 bytes)
CREATE apps/architecture-reference/src/app/modules/site/home/home.component.scss (0 bytes)
UPDATE apps/architecture-reference/src/app/modules/site/site.module.ts (497 bytes)
```

## Application Features

The application will have a set of (3) different features that will allow for the demonstration of:

1. availability based on navigation/route (i.e., lazy-loading module if/when route navigation occurs).
2. display based on the user's authentication/authorization status
3. a feature module that allows an anonymous user to view
   * show/allow additional features based on authentication/user status

Use the CLI to create the feature modules - each module with have their own route definitions.

> Pro Tip: use the `--routing` option to add a routing module to the feature module setup.

```ts
ng g module features/admin --routing --project=architecture-reference
ng g module features/dashboard --routing --project=architecture-reference
ng g module features/courses --routing --project=architecture-reference
```

The output of generating the feature modules:

```ts
ng g module features/admin --routing --project=architecture-reference
CREATE apps/architecture-reference/src/app/features/admin/admin-routing.module.ts (248 bytes)
CREATE apps/architecture-reference/src/app/features/admin/admin.module.ts (275 bytes)

ng g module features/dashboard --routing --project=architecture-reference
CREATE apps/architecture-reference/src/app/features/dashboard/dashboard-routing.module.ts (252 bytes)
CREATE apps/architecture-reference/src/app/features/dashboard/dashboard.module.ts (291 bytes)

ng g module features/courses --routing --project=architecture-reference
CREATE apps/architecture-reference/src/app/features/courses/courses-routing.module.ts (250 bytes)
CREATE apps/architecture-reference/src/app/features/courses/courses.module.ts (283 bytes)
```

```ts
ERROR in ../app-routing.module.ts(13,25): 
    error TS1323: Dynamic import is only supported 
    when '--module' flag is 'commonjs' or 'esNext'.
```

### Feature Route Configuration

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
```

### Application Routing Configuration (Lazy-Loading)

Update the *module* property in *compilerOptions* node of the workspace `tsconfig.json` file to enable the use of `import` method while lazy-loading modules in the `loadChildren` configuration of the route.

```json
"compilerOptions": {
    "module": "esNext"
}    
```

Update the application-level router module to lazy-load the target features.

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../modules/site/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import(`./../features/dashboard/dashboard.module`).then(m => m.DashboardModule),
  },
  {
    path: 'admin',
    loadChildren: () => import(`./../features/admin/admin.module`).then(m => m.AdminModule),
  },
  {
    path: 'courses',
    loadChildren: () => import(`./../features/courses/courses.module`).then(m => m.CoursesModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
```

## Core Services (Business Domain Logic)

A core domain service library encapsulates the business logic of a specific vertical/feature of an application. This project exposes a service that provides the API for all operations pertaining to the specific feature. All of the business logic is encapsulated within the library. The business logic will use a repository pattern to execute Web API operations.

The purpose of a *core domain service* is to abstract and encapsulate business logic implementation for a specific domain feature. A library of this sort has the potential for use by other library and application projects.

* there is not UI logic or concerns in this layer of the application
* access is provided by an exposed service (facade pattern)
* the library project is basically an Angular module
* the library/module will contain internal services that are *not* exposed to consumers of the core domain service.

### Core Domain Library

Create a new library project to implement a core domain library for a specific application-specific vertical/feature. In this example, the domain feature is *Courses*.

> Note: Use the `--publishable` option to provide configuration for publishing as a shared package.
> Syntax: ng generate library [NAME OF APPLICATION]/[NAME OF CORE DOMAIN PROJECT]
> CLI Command: ng g lib reference/courses

```ts
ng g lib reference/courses --publishable --dry-run
? In which directory should the library be generated?
? What framework should this library use? Angular    [ https://angular.io/             ]
? Which tags would you like to add to the library? (used for linting)
? Which Unit Test Runner would you like to use for the library? Jest [https://jestjs.io/]
CREATE libs/reference/courses/ng-package.json (170 bytes)
CREATE libs/reference/courses/package.json (152 bytes)
CREATE libs/reference/courses/README.md (1074 bytes)
CREATE libs/reference/courses/tsconfig.lib.json (719 bytes)
CREATE libs/reference/courses/tslint.json (188 bytes)
CREATE libs/reference/courses/src/index.ts (48 bytes)
CREATE libs/reference/courses/src/lib/reference-courses.module.ts (172 bytes)
CREATE libs/reference/courses/src/lib/reference-courses.module.spec.ts (400 bytes)
CREATE libs/reference/courses/tsconfig.json (126 bytes)
CREATE libs/reference/courses/tsconfig.spec.json (259 bytes)
CREATE libs/reference/courses/jest.config.js (278 bytes)
CREATE libs/reference/courses/src/test-setup.ts (30 bytes)
UPDATE angular.json (40694 bytes)
UPDATE package.json (8112 bytes)
UPDATE nx.json (1272 bytes)
UPDATE tsconfig.json (1429 bytes)
```

#### Angular.json Project Configuration

The *angular.json* file is updated with a new section in the *projects* node.

```json
 "reference-courses": {
      "root": "libs/reference/courses",
      "sourceRoot": "libs/reference/courses/src",
      "projectType": "library",
      "prefix": "tc",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-ng-packagr:build",
          "options": {
            "tsConfig": "libs/reference/courses/tsconfig.lib.json",
            "project": "libs/reference/courses/ng-package.json"
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": ["libs/reference/courses/tsconfig.lib.json", "libs/reference/courses/tsconfig.spec.json"],
            "exclude": ["**/node_modules/**"]
          }
        },
        "test": {
          "builder": "@nrwl/builders:jest",
          "options": {
            "jestConfig": "libs/reference/courses/jest.config.js",
            "tsConfig": "libs/reference/courses/tsconfig.spec.json",
            "setupFile": "libs/reference/courses/src/test-setup.ts"
          }
        }
      },
      "schematics": {
        "@nrwl/schematics:component": {
          "styleext": "scss"
        }
      }
 }
```      

#### TSConfig Path Configuration

The workspace *tsconfig.json* now contains a new *paths* entry to map the location of the new project to an npm-like package name: `@tc/reference/courses`. This will allow consumers of the new library to import and use it as if it were a library/package.

```json
"@tc/reference/courses": ["libs/reference/courses/src/index.ts"]
```

A consumer of this library will import the service using the Workspace scope name *@tc* and the path to the target module. The service operation is a *generic* method. The expected data type of the result in this example is a *Course[]* list/array. The expected data payload type `<T>` is a list of *Course* objects. The *data* payload is returned within an ApiResponse object as indicated in the processing of the Observable *next* event `handleRetrieveCoursesResponse<T>(response: ApiResponse<T>)`.

> **Note**: The *ApiResponse* is a strongly-typed object that allows Web API responses to be processed reliable and consistently for all requests. It is used within the *HttpService* to handle HTTP errors. [Learn more about the `ApiResponse` here](#api-response).

```ts
import { CoursesService } from '@tc/reference/courses';

  constructor(private coursesService: CoursesService);
    this.initialize();
  }
  
  initialize(): void {
    this.coursesService
      .retrieveCourses<Course[]>()
      .subscribe(
        response => this.handleRetrieveCoursesResponse(response),
        error => this.handleServiceErrors(error),
        () => this.finishRequest(`Finished processing request for courses.`)
      );
  }

  private handleRetrieveCoursesResponse<T>(response: ApiResponse<T>): void {
    if (response && response.IsSuccess && response instanceof SuccessApiResponse) {
      this.coursesSubject.next(response.Data);
    } else {
      // display any notifications;
      this.notifications.addMessage(
        new Notification(
          'Courses Not Available',
          'Sorry for the inconvenience. It appears that there was an error or failure while attempting to retrieve courses.',
          this.coursesService.retrieveServiceContextErrorMessages()
        )
      );

      this.handleServiceErrors(<ErrorApiResponse<Course[]>>response);
    }
  }
```

### Generate a Core Domain Service

Create a service that will provide the API for operations related to the specific feature/domain. The new service is very important to the *core domain library*. It will expose an API or interface to consumers of the library. All of the implementation details will be encapsulated within the library and not publicly exposed like this service. 

> Note: A service with this type of responsibility is often referenced as a facade, service facade, or service API. The purpose is to provide an entry point for the module container. A service of this type should not contain any implementation details or business logic code. This service will delegate any requests to a designated business layer that is well-encapsulated within the module.

Use the following CLI command to create a new service for the library project. Include a path to the specified location relative to the *libs* project folder. There will most likely be several core domain services for larger applications. Make sure to include the `--project` option and the target project name.

```ts
ng g service reference/courses/courses --project=reference-courses
CREATE libs/reference/courses/src/lib/reference/courses/courses.service.spec.ts (338 bytes)
CREATE libs/reference/courses/src/lib/reference/courses/courses.service.ts (136 bytes)
```

To enable the service to be consumed, it needs to be exposed. The *index.ts* of the library (root-level) is a barrel file that contains a list or manifest of items within the module that are accessible by any consumers. Use *export* for the specified service (*CoursesService*) to make it publicly available.

```ts
export { ReferenceCoursesModule } from './lib/reference-courses.module';
export { CoursesService } from './lib/courses.service';
```

### Generate Business Provider

A new layer in the architecture is introduced here. The *core domain service* technically is the entry point of the business logic - due to its responsibility of providing an API. However, the coordination of business logic is not handled by the service. The service will delegate all requests to the *Business Provider*. The business provider is managed as a separate layer of the application due to its distinct responsibilities and concerns. 

Create a new service for the Business Provider using the CLI command.

```ts
ng generate service businessProvider --project=reference-courses --spec=false
```

As with most application services, the initial setup of the service will include:

* extend from the base class *ServiceBase*
* inject a *LoggingService* into the constructor.

```ts
import { Injectable } from '@angular/core';
import { ServiceBase } from '@tc/foundation';
import { LoggingService } from '@tc/logging';

@Injectable()
export class BusinessProviderService extends ServiceBase {
  constructor(loggingService: LoggingService) {
    super(loggingService, 'BusinessProviderService');
  }
}
```

### Core Domain Service Setup

The initial setup of a core domain service will include:

* BusinessProviderService
* LoggingService

Notice the initial implementation of the `retrieveCourses()` method is a hard-coded fake or temporary setup for the return object. You can use this approach to verify each of the layers return the expected result.

```ts
import { Injectable, Inject, OnInit } from '@angular/core';
import { ServiceBase } from '@tc/foundation';
import { LoggingService } from '@tc/logging';
import { ApiResponse, SuccessApiResponse } from '@tc/common';

import { Course } from '@tc/reference/common';
import { Observable, of } from 'rxjs';
import { BusinessProviderService } from './business/business-provider.service';

@Injectable()
export class CoursesService extends ServiceBase implements OnInit {
  constructor(@Inject(BusinessProviderService) private businessProvider: BusinessProviderService, loggingService: LoggingService) {
    super(loggingService, 'CoursesService');

    this.initialize();
  }

  initialize(): void {
    this.businessProvider.serviceContext = this.serviceContext;
  }

  retrieveCourses<T>(): Observable<ApiResponse<T>> {
    const data: Course[] = [];

    const c1 = new Course();
    c1.id = 'c1';
    c1.authorId = 'a1';
    c1.category = 'code';
    c1.dateCreated = new Date();
    c1.title = 'Learn How to Code';
    c1.description = `Turkey meatloaf occaecat tail ball tip pariatur meatball dolore.`;

    data.push(c1);

    const apiResponse = new SuccessApiResponse();
    apiResponse.IsSuccess = true;
    apiResponse.Message = ``;
    apiResponse.Data = data;

    return of<ApiResponse<Course[]>>(apiResponse);
  }
}
```

As the operation is implemented in each of the layers, each method is refactored to use the specified layer to perform the actual operation. The domain service should be updated to use the *BusinessProviderService*. 

```ts
  /**
   * A typical implementation of a service operation. Uses the business provider
   * to delegate the request to for business logic processing.
   */
  retrieveCourses<T>(): Observable<ApiResponse<T>> {
    return this.businessProvider.retrieveCourses<T>();
  }
```

The `retrieveCourses()` method in the *BusinessProviderService* can now use the fake implementation if required. This will allow the service to return the correct result using the business provider.

```ts
const data: Course[] = [];

const c1 = new Course();
c1.id = 'c1';
c1.authorId = 'a1';
c1.category = 'code';
c1.dateCreated = new Date();
c1.title = 'Learn How to Code';
c1.description = `Turkey meatloaf occaecat tail ball tip pariatur meatball dolore.`;

data.push(c1);

const apiResponse = new SuccessApiResponse();
apiResponse.IsSuccess = true;
apiResponse.Message = ``;
apiResponse.Data = data;

return of<ApiResponse<Course[]>>(apiResponse);
```

### Business Provider Implementation

The Business Provider is responsible for coordinating the execution of business logic using one ore more [business actions](#actions). The implementation of a business provider method is typically 3 lines of code to instantiate an action, perform the action, and lastly to return the result of the action.

```ts
import { Injectable } from '@angular/core';
import { ServiceBase } from '@tc/foundation';
import { LoggingService } from '@tc/logging';
import { ApiResponse } from '@tc/common';
import { Observable } from 'rxjs';
import { RetrieveCoursesAction } from './actions/retrieve-courses-action';
import { CoursesRepositoryService } from './courses-repository.service';

@Injectable()
export class BusinessProviderService extends ServiceBase {
  constructor(loggingService: LoggingService, public courseRepository: CoursesRepositoryService) {
    super(loggingService, 'BusinessProviderService');
  }

  retrieveCourses<T>(): Observable<ApiResponse<T>> {
    const action = new RetrieveCoursesAction<T>();
    action.Do(this);
    return action.response;
  }
}
```

### Actions

The core business logic is executed only within business actions. A business action is a specialized class that provides an implementation of logic as a unit of work. Each business action is a discreet piece of business logic where you can:

* test and validate the inputs
* process business rules
* execute HTTP requests
* call other *actions* (indirectly) by way of the Business Provider

In most applications, business logic is implemented within methods. These methods may take inputs and will provide a result. Many times the result is provided by calling other methods - sometimes with additional inputs. These methods may yet call other methods in the same way. This approach is a method-chaining approach. Methods of this sort are not consistent with their implementation details and are mostly not testable. However, the importance of business logic should require consistency for maintainability as well extensibility. This is typically not the case with method-based business logic. 

Testability is a key requirement for high-quality business logic implementation. The Business Actions library is a framework for implementing robust business logic that is 100% testable, consistent, and reliable. This framework takes advantage of:

* Object-Oriented principles: encapsulation, inheritance, and polymorphism
* participates in the Template Method design pattern
* uses concepts from Rete Algorithm and inference logic processing
* integrates with a rule engine to define and execute rules with results

Actions are executed or performed only if the validation of inputs and/or business rules is successful. Based on the status of an *rule*, the processing path of an operation may change. The pattern allows for call other *action* using the Business Provider to evaluate different actions with rules. Thus based on the logic and flow of the rule evaluations based on input (i.e., facts)


#### Business Action Base

A simple base action class is defined to quickly implement business actions. One of the main responsibilities is to provide a property for the action ***response***: `public response: Observable<ApiResponse<T>>`. A response is anything that the action defines. In our example, the response is a payload of data wrapped within an `ApiResponse<T>` and returned as an Observable to the consumer or caller of the action.

```ts
ng g class businessActionBase --spec=false
CREATE libs/reference/courses/src/lib/business/actions/business-action-base.ts (36 bytes)
```

The `Do()` is responsible for executing the actual action. However, before it does that it will provide the action with some required dependencies - [via Inversion of Control (IoC) pattern](https://en.wikipedia.org/wiki/Inversion_of_control). This allows the signatures of the actions to be clean without any references to configuration, infrastructure or cross-cutting concerns.

It provides references to the current:

* **Business Provider**
  * used to call other actions
  * used to access any repositories (i.e., HTTP repositories for data operations)
* **Service Context**
  * used to add any messages related to the operation
* **Logging Service**
  * used to log any information using a configured logging service

```ts
import { LoggingService } from '@tc/logging';
import { ActionBase } from '@tc/foundation';
import { Observable } from 'rxjs';
import { BusinessProviderService } from './../business-provider.service';
import { ApiResponse } from '@tc/common';

/**
 * A helper class to provide the action with any dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
export abstract class BusinessActionBase<T> extends ActionBase {
  showRuleMessages = true;
  hideRuleMessages = false;

  businessProvider: BusinessProviderService;
  loggingService: LoggingService;
  actionName: string;
  public response: Observable<ApiResponse<T>>;

  constructor(actionName: string) {
    super();
    this.actionName = actionName;
  }

  /**
   * Use the [Do] method to perform the action. Also uses [inversion of control]
   * and provides the action the same instance of the [service context] and
   * [logging service].
   */
  Do(businessProvider: BusinessProviderService) {
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;

    this.execute();
  }
}
```

#### Business Action Base

The Business *ActionBase* provides the structure for the lifecycle of a business action. It participates in the [template method design pattern](https://en.wikipedia.org/wiki/Template_method_pattern). This class is an *abstract* class and cannot be instantiated directly. It is used to provide common behavior implementations for all business actions - otherwise, each action would have to implement most if not all of these methods.

The template provides the sequence of pipeline operations that are performed when a single action is executed. The sequence is reliable and consistent and provides the flexibility to extend the pipeline with additional pipeline operations as required by the application. This class is part of the *@tc/foundation* library project and is shared by all applications. 

> Note: Other or more specialized *ActionBase* classes could be created for distinct purposes in one or more applications. TypeScript allows for overriding implementations of existing methods and/or specialized implementations for the abstract methods of the [*Action*](#action-framework-class) class.

The *ActionBase* class contains implementations for:

* **validateAction()**: use to process all rules added to the *ValidationContext*. Each rule will render a result. All results are added to the *results* collection of the Validation Context.
* **postValidateAction()**: use to determine if there are any failed rules (i.e., rule violations). Each rule violation is *published* to the Service Context.
* **postExecuteAction()**: use to determine if any errors occurred during the execution of the business logic. Error messages are sent to the Logging Service.
* **validateActionResult()**: if there are any rule violations, error messages are added to the *ApiErrorMessage* response. This response is returned to the consumer of the request and may include information to display to the user.

```ts
import { Observable, throwError } from 'rxjs';

import { Action } from '@tc/actions';
import { ValidationContext } from '@tc/rule-engine';
import { ServiceMessage } from '@tc/rule-engine';
import { MessageType } from '@tc/rule-engine';
import { ServiceContext } from '@tc/rule-engine';
import { ActionResult } from '@tc/actions';
import { CompositeRule } from '@tc/rule-engine';
import { RuleResult } from '@tc/rule-engine';

import { LoggingService } from '@tc/logging';
import { Severity } from '@tc/logging';
import { ErrorApiResponse, ApiErrorMessage } from '@tc/common';

/**
 * This is the application's base Action class that provides implementation of pipeline methods - pre/post
 * execution methods.
 *
 * The pre-execute methods that can be implemented are:
 *		1. start();
 *		2. audit();
 *		3. preValidateAction();
 *		4. evaluateRules();
 *		5. postValidateAction();
 *		6. preExecuteAction();
 *
 *If the status of action is good, the business logic will be executed using the:
 *		1. processAction();
 *
 * The post-execution methods that can be implemented are:
 *		1. postExecuteAction();
 *		2. validateActionResult();
 *		3. finish();
 */

export abstract class ActionBase extends Action {
  serviceContext: ServiceContext;
  response: Observable<any>;
  loggingService: LoggingService;
  actionName: string;

  /**
   * This is a required implementation if you want to render/execute the rules that
   * are associated to the specified action.
   *
   * NOTE: ALL CONCRETE ACTIONS ARE REQUIRED TO IMPLEMENT THE [preValidationAction()] method.
   */
  validateAction(): ValidationContext {
    return this.validationContext.renderRules();
  }

  /**
   * Use to process the validation context to determine if there are any rule violations.
   */
  postValidateAction() {
    this.loggingService.log(
      this.actionName,
      Severity.Information,
      `Preparing to determine if the ${this.actionName} contains validation errors.`
    );

    if (this.validationContext.hasRuleViolations()) {
      this.loggingService.log(this.actionName, Severity.Information, `The ${this.actionName} contains validation errors.`);

      // Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
      this.validationContext.results.forEach(result => {
        if (!result.isValid) {
          this.publishRuleResult(result);
          this.retrieveRuleDetails(result);
        }
      });
    }
  }

  /**
   *  This method is executed after the [performAction] method. Currently logs any messages from
   * the service.
   */
  postExecuteAction() {
    if (this.actionResult === ActionResult.Fail) {
      this.serviceContext.Messages.forEach(e => {
        if (e.MessageType === MessageType.Error) {
          this.loggingService.log(this.actionName, Severity.Error, e.toString());
        }
      });
    }
  }

  /**
   * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
   */
  validateActionResult(): ActionResult {
    this.loggingService.log(this.actionName, Severity.Information, `Validating the ${this.actionName} result.`);

    // determine the status of the action based on any rule violations;
    if (this.validationContext.hasRuleViolations()) {
      this.loggingService.log(this.actionName, Severity.Error, `The ${this.actionName} contains rule violations.`);
      this.actionResult = ActionResult.Fail;

      const errorResponse = new ErrorApiResponse();
      errorResponse.IsSuccess = false;
      errorResponse.Message = `Validation errors exist.`;

      if (this.serviceContext.hasErrors()) {
        this.serviceContext.Messages.forEach(serviceMessage => {
          errorResponse.Errors.push(new ApiErrorMessage(serviceMessage.Message, serviceMessage.DisplayToUser, '', ''));
        });
      }

      throwError(errorResponse);
      // this.response = Observable.throw(errorResponse);
    }
    this.actionResult = this.serviceContext.isGood ? ActionResult.Success : ActionResult.Fail;
    return this.actionResult;
  }

  /**
   * Use to process rule results for composite rules. Note, that this function is recursive
   * and will process all composite rules in the rule set contained in the ValidationContext.
   * @param ruleResult The result of a rendered rule.
   */
  retrieveRuleDetails(ruleResult: RuleResult) {
    if (ruleResult.rulePolicy instanceof CompositeRule) {
      const composite = ruleResult.rulePolicy as CompositeRule;
      if (composite && composite.hasErrors) {
        const errors = composite.results.filter(result => !result.isValid && result.rulePolicy.isDisplayable);

        errors.forEach(errorResult => {
          this.publishRuleResult(errorResult);

          if (errorResult.rulePolicy instanceof CompositeRule) {
            this.retrieveRuleDetails(errorResult);
          }
        });
      }
    }
  }

  /**
   * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
   * @param ruleResult
   */
  publishRuleResult(ruleResult: RuleResult) {
    const serviceMessage = new ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, MessageType.Error);
    serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
    serviceMessage.Source = this.actionName;
    this.serviceContext.Messages.push(serviceMessage);
    this.loggingService.log(this.actionName, Severity.Error, `${serviceMessage.toString()}`);
  }
}
```

#### Action Framework Class

The abstract *Action* class provides the foundation and structure for business action implementations. All *abstract* methods are required to be implemented by any sub-classes that inherit from this base framework class. This is the class where new pipeline methods could be defined  - they would be available to all sub-classes.

> Note: It would be a rare occasion to modify this class. It contains generic methods that could be overridden to provide additional behaviors in business action processing. For more precise and defined operations, add them in the necessary sequence within the pipeline (template).

This class contains the all important `execute()` method to process any action during runtime.

```ts
import { ValidationContext, ValidationContextState } from '@tc/rule-engine';
import { IAction } from './i-action';
import { ActionResult } from './action-result';

/**
 * This is the framework Action class that provides the pipeline of pre/post
 * execution methods. This class implements the [Template Method] pattern. Use
 * it to create and manage the life cycle of an action.
 *
 * The pre-execute functions that can be implemented are:
 *		1. start();
 *		2. audit();
 *		3. preValidateAction();
 *		4. evaluateRules();
 *		5. postValidateAction();
 *		6. preExecuteAction();
 *
 *If the status of action is good, the business logic will be executed using the:
 *		7. processAction();
 *
 * The post-execution functions that can be implemented are:
 *		8. postExecuteAction();
 *		9. validateActionResult();
 *		10. finish();
 */
export abstract class Action implements IAction {
  /**
   * Indicates if the action is allowed execution. If there are any rule
   * violations in the validation context, the action is not allowed to
   * execute.
   */
  allowExecution = true;

  /**
   * The validation context for the specified action instance.
   */
  private _validationContext: ValidationContext = new ValidationContext();

  /**
   * The result of the action. The default value is [Unknown], until the action
   * is executed.
   */
  actionResult: ActionResult = ActionResult.Unknown;

  /**
   * The default constructor for the class.
   */
  constructor() {}

  /**
   * Use to retrieve the [ValidationContext] for the specified action.
   */
  get validationContext(): ValidationContext {
    return this._validationContext;
  }

  /**
   * Use this method to execute a concrete action. A concrete action must implement
   * the [processAction] and the [validateActionResult] functions to be a valid
   * action.
   */
  execute() {
    this.processActionPipeline();
  }

  /**
   * Use this method to process the action pipeline methods.
   */
  private processActionPipeline() {
    this.startAction();
    if (this.allowExecution) {
      this.processAction();
    }
    this.finishAction();
  }

  /**
   * Use this method to call the pipeline methods for the [start] or beginning
   * process of the action pipeline.
   */
  private startAction() {
    this.start();
    this.audit();
    this.preValidateAction();
    this.evaluateRules();
    this.postValidateAction();
    this.preExecuteAction();
  }

  /**
   * Use this method to execute the methods at the end of the action pipeline.
   */
  private finishAction() {
    this.postExecuteAction();
    this.validateActionResult();
    this.finish();
  }

  /**
   * Use this method to process the action. This will only be called if the action's
   * validation context is in a valid state (no rule violations).
   *
   * All concrete actions are required to provide an implementation of the [performAction]
   * method that is called for this part of the action pipeline.
   */
  private processAction() {
    this.performAction();
  }

  /**
   * All action must implement this function. This is where your
   * [business logic] should be implemented. This function is called if
   * there are no validation rule exceptions.
   */
  abstract performAction();

  /**
   * Override/Implement this function to perform an early operation in the action pipeline.
   * This function belongs to the pre-execute functions of the action pipeline.
   */
  start() {}

  /**
   * Implement this function to perform any auditing features during the pre-execution of the
   * business logic.
   */
  audit() {}

  /**
   * Use this function to setup any validation rules before the validation happens. This
   * function is called before [evaluateRules]. Must be implemented by concrete actions.
   */
  abstract preValidateAction();

  /**
   * Use this function to implement the execution of the validation and business rules. This
   * function is called after [preValidateAction].
   */
  evaluateRules() {
    const context = this.validateAction();
    if (context.isValid) {
      this.allowExecution = true;
      this.validationContext.state = ValidationContextState.Success;
    } else {
      this.allowExecution = false;
      this.validationContext.state = ValidationContextState.Failure;
    }
  }

  /**
   * Use to determine or handle the results of the rule evaluation. This
   * function is called after the [evaluateRules].
   */
  postValidateAction() {}

  /**
   * Use this function to perform any setup before the action is executed.
   */
  preExecuteAction() {}

  /**
   * Use this function to evaluate the action after the the business logic within
   * the [performAction] has executed.
   */
  postExecuteAction() {}

  /**
   * This function requires implementation by concrete actions to determine the state and result of the action.
   * Use this opportunity to check the ValidationContext to handle any rule violations.
   */
  abstract validateActionResult(): ActionResult;

  /**
   * Use this function to perform any cleanup, logging, or disposing of resources used
   * by the action. This is the last function called during the pipeline.
   */
  finish() {}

  /**
   * Implement this function to perform validation of business rules and data.
   */
  validateAction() {
    return this.validationContext;
  }
}
```

### Business Action Implementation

Use the Angular CLI to create new business action classes.

```ts
ng g class retrieveCoursesAction --spec=true
CREATE libs/reference/courses/src/lib/business/actions/retrieve-courses-action.spec.ts (216 bytes)
CREATE libs/reference/courses/src/lib/business/actions/retrieve-courses-action.ts (39 bytes)
```

A business action at this level has a simple implementation. However, it can take advantage of any inherited methods contained in the base classes and the action framework. This makes it more powerful than simply implementing business logic in random methods. Here are the common touch points:

* use the constructor to pass in any required inputs
* extend from the application/domain business action base class
  * requires call to `super()` to provide the name of the action
* implement the `preValidateAction()` method to add any validation or business rules. The method is always required for actions - however, it may or may not have any defined business or validation rules.
* implement the `performAction()` to perform actual business logic if the action state is valid - does not contain any validation or business rule violations.

Notice that the action has access to the *BusinessProviderService* in order to use any *Repository* services for data operations. In this example, it is making a repository call for a list of *Course* items as indicated by the generic type of <T> - defined by the action class `RetrieveCoursesAction<T>`.

```ts
import { BusinessActionBase } from './business-action-base';
import { of } from 'rxjs';
import { ApiResponse } from '@tc/common';
import { Course } from '@tc/reference/common';
import { SuccessApiResponse } from '@tc/common';

export class RetrieveCoursesAction<T> extends BusinessActionBase<T> {
  constructor() {
    super('RetrieveCoursesAction');
  }

  preValidateAction() {
    // throw new Error('Method not implemented.');
  }

  performAction() {
    this.response = this.businessProvider.courseRepository.retrieveCourses<T>();
  }
}
```

#### Business Repository

The *Repository* provides an abstraction for data operations that will use some sort of data store or repository. Many times this is implemented against a Web API. In this example, the repository has an *HttpService* injected into the constructor. This allows for the construction and execution HTTP requests using a reliable and consistent format. 

The purpose of the repository is to construct the information for a request and to allow the *HttpService* to execute the request. This follows the Separation of Concerns principle. The HttpService is responsible for all things HTTP. This service only references/uses the HTTP service. There is no dependency on the Angular HttpClient in this class.

* establish the target **URL**
* create the **options** for the request
  * **method** type
  * **header** information
  * the **URL**
  * the **body** with a payload of data
  * a Boolean indicator to determine if **credentials** (cookies) are included

```ts
import { Injectable, Inject } from '@angular/core';
import { ServiceBase } from '@tc/foundation';
import { LoggingService } from '@tc/logging';
import { Observable, of } from 'rxjs';
import { ApiResponse, SuccessApiResponse } from '@tc/common';
import { Course } from '@tc/reference/common';
import { HttpService, HttpRequestMethod } from '@tc/http-service';

@Injectable()
export class CoursesRepositoryService extends ServiceBase {
  baseUrl = 'http://mybackend.com/api/';
  noCredentials = false;
  credentialsRequired = true;

  constructor(@Inject(HttpService) private httpService: HttpService, loggingService: LoggingService) {
    super(loggingService, 'CoursesRepositoryService');
  }

  /**
   * Use to retrieve courses using the HTTP service.
   */
  retrieveCourses<T>(): Observable<ApiResponse<T>> {
    const url = this.baseUrl.concat('assets/data/courses.json');
    const options = this.httpService.createOptions(
      HttpRequestMethod.get,
      this.httpService.createHeader(),
      url,
      null,
      this.noCredentials
    );
    return this.httpService.execute<T>(options);
  }
}
```

#### Business Action with Rules

Most business actions will require some sort of validation or business rule processing before attempting to execute business logic. The following example demonstrates the use of the *ValidationContext* to define a set of rules for the action. When the action is executed, each method in the action's pipeline is called in a specified sequence. Validation is always performed before the `performAction()` method. This gives the action the opportunity to evaluate the state of the action - if the ValidationContext contains any rule violations, the business logic in the `performAction()` method is never called. Instead an *ErrorApiResponse* is returned as an Observable with a list of messages for the consumer of the request.

In the example below, rules are added using a fluent-API syntax. The rule engine framework also supports rule classes to be defined as a container of a rule set. This provides a mechanism to define a rule or rule-set and reuse that rule throughout the implementation of business logic in actions.

```ts
import { of } from 'rxjs';

import { BusinessActionBase } from './business-action-base';
import { Notification } from '../models/notification.model';
import { IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@tc/rule-engine';
import { SuccessApiResponse } from '@tc/common';

export class ValidateNotificationAction<T> extends BusinessActionBase<T> {
  private notification: Notification;

  /**
   * Use the constructor to provide any required inputs for the action.
   */
  constructor(notification: Notification) {
    super('AddFormMessageAction');
    this.notification = notification;
  }

  /**
   * Use this pipeline method as an opportunity to
   * setup the action for processing, validating business rules, and/or
   * performing other data validation.
   *
   * This method runs before [validationAction] and [performAction].
   */
  preValidateAction() {
    // this.validationContext.addRule(new FormMessageIsValidRule('FormMessageIsValid', 'The form message is not valid.', this.formMessage, true));

    this.validationContext
      .addRule(
        new IsNotNullOrUndefined(
          'FormMessageIsNotNull',
          'The form message cannot be null or undefined.',
          this.notification,
          this.doNotDisplayToUser
        )
      )
      .addRule(
        new StringIsNotNullEmptyRange(
          'MessageTitleIsValid',
          'The message title is not valid. Must be within 2 and 45 characters.',
          this.notification.title,
          2,
          45,
          this.doNotDisplayToUser
        )
      )
      .addRule(
        new StringIsNotNullEmptyRange(
          'MessageDescriptionIsValid',
          'The message description is not valid. Must be within 1 and 200 characters.',
          this.notification.description,
          1,
          200,
          this.doNotDisplayToUser
        )
      );

    this.notification.messages.forEach(item => {
      this.validationContext.addRule(
        new StringIsNotNullEmptyRange('MessageIsValid', 'The message item is not valid. Must be within 2 and 125 characters.', item, 2, 125)
      );
    });
  }

  /**
   * Use this method to implement the action's business logic. This
   * method will execute if there are no validation or business rule violations.
   */
  performAction() {
    const successApiMessage = new SuccessApiResponse();
    successApiMessage.IsSuccess = true;
    successApiMessage.Data = this.notification;
    successApiMessage.Message = 'Successfully validated the notification message.';
    successApiMessage.Timestamp = new Date(Date.now());

    this.response = of(successApiMessage);
  }
}
```
### Service Context

With most layered architectures, there is a requirement to provide a *context* throughout the stack of layers for a specific operations. The architecture makes use of a *ServiceContext* item to contain and manage information related to a specific operation or call.

Our core domain service will provide its instance of the ServiceContext to the Business Provider. This enables the business provider to add details to a shared context while it is processing the business logic of the application. This information may an assortment of messages gathered from business actions or even from backend APIs.

To share a *ServiceContext* with a business provider, use something similar to the following within the core domain service. 

```ts
initialize(): void {
    this.businessProvider.serviceContext = this.serviceContext;
  }
```

The *ServiceContext* is a simple, yet powerful mechanism to collect and share information with the consumers of a specific service. It provides just enough structure to collect important information throughout simple or complex processes and operations. The source of the messages can be the business rules, validation results, Web APIs, and other services.

* add messages to a list
* determine if there are any error messages - the state of the service context
* determine if the state of the service context is good

```ts
import { ServiceMessage } from './ServiceMessage';
import { MessageType } from './MessageType';

/**
 * Use this class to manage the context of a single service call. This
 * class will contain a list of any service messages added during the processing
 * of a service request.
 */
export class ServiceContext {
  /**
   * A list of service messages added by the application during the processing of the
   * specified service request.
   */
  Messages: Array<ServiceMessage> = new Array<ServiceMessage>();

  /**
   * Use this method to add a new message to the [ServiceContext].
   */
  addMessage(message: ServiceMessage) {
    this.Messages.push(message);
  }

  /**
   * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
   */
  hasErrors(): boolean {
    if (this.Messages && this.Messages.length > 0) {
      const errorMessages = this.Messages.filter(f => f.MessageType === MessageType.Error);
      if (errorMessages.length > 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Use to determine if the current [ServiceContext] does not contain any errors.
   */
  get isGood(): boolean {
    if (this.Messages && this.Messages.length > 0) {
      const errorMessages = this.Messages.filter(f => f.MessageType === MessageType.Error);
      if (errorMessages.length > 0) {
        return false;
      }
    }
    return true;
  }
}
```

### Service Messages

A *ServiceMessage* is a container for information that can be added to a ServiceContext during the processing of a specific operation. It allows for different layers of the application to provide any relevant messages to the context of the call. This allows consumers of the operation to access messages and also to display information in the UI components of the application.

There is an overloaded constructor for creating messages with different inputs. The implementation also uses a fluent-API syntax to construct messages with specific parts.

A *ServiceMessage* contains the following:

* Name:
* Message:
* MessageType:
* Source
* DisplayToUser
* overloaded constructors
* fluent-API syntax to create new messages.

```ts
import { MessageType } from './MessageType';

/**
 * Use this class to create a message for the current [ServiceContext].
 */
export class ServiceMessage {
  /** Use to specify the name of the message. */
  Name: string;

  /** Use to specify the message. */
  Message: string;

  /** Use to specify  */
  MessageType: MessageType;

  /** Use to indicate the source of the message. */
  Source: string;

  /** Use to indicate if the specified message should be displayed to the user. */
  DisplayToUser: boolean;

  constructor(name?: string, message?: string, messageType?: MessageType, source?: string);
  /**
   * The constructor for the [ServiceMessage].
   * @param name The name of the message.
   * @param message The display text of the message.
   * @param messageType: Indicates the type of message.
   * @param source: Indicates the source of the message.
   * @param displayToUser: Indicates if the message is displayable.
   */
  constructor(name: string, message?: string, messageType?: MessageType, source?: string);
  /**
   * The constructor for the [ServiceMessage].
   * @param name The name of the message.
   * @param message The display text of the message.
   * @param messageType: Indicates the type of message.
   * @param source: Indicates the source of the message.
   */
  constructor(name: string, message: string, messageType?: MessageType, source?: string);
  /**
   *
   * @param name The name of the message.
   * @param message The display text of the message.
   * @param messageType: Indicates the type of message.
   * @param source: Indicates the source of the message.
   * @param displayToUser Use to indicate if the specified message should be displayed to the user.
   */
  constructor(name: string, message: string, messageType?: MessageType, source?: string, displayToUser: boolean = false) {
    this.Name = name;
    this.Message = message;
    if (message) {
      this.MessageType = messageType as MessageType;
    }
    if (source) {
      this.Source = source as string;
    }
  }

  /**
   * Use this extension method to add the name of the message.
   * @param name The name of the service message.
   */
  WithName(name: string) {
    this.Name = name;
    return this;
  }

  /**
   * Use this extension method to add the message text to the ServiceMessage item.
   * @param message The display text of the service message.
   */
  WithMessage(message: string) {
    this.Message = message;
    return this;
  }

  /**
   * Use this extension method to set the [MessageType] of the ServiceMessage item.
   * @param messageType: Use to indicate the message type.
   */
  WithMessageType(messageType: MessageType) {
    this.MessageType = messageType;
    return this;
  }

  /**
   * Use this extension method to set the [Source] of the ServiceMessage item.
   * @param source: Use to indicate the source of the message.
   */
  WithSource(source: string) {
    this.Source = source;
    return this;
  }

  /**
   * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
   * @param displayToUser: A boolean value to indicate if the message can be displayed to the user.
   */
  WithDisplayToUser(displayToUser: boolean) {
    this.DisplayToUser = displayToUser;
    return this;
  }

  /**
   * Use this method return a string representing the ServiceMessage.
   */
  toString() {
    return `Name: ${this.Name}; Message: ${this.Message}; MessageType: ${this.MessageType.toString()}; Source: ${
      this.Source
    }; DisplayToUser: ${this.DisplayToUser}`;
  }
}
```

#### Service Message with Constructor

The following example shows a message instantiated using the *constructor*. It is added to the *Messages* collection of the Service Context. 

```ts
publishRuleResult(ruleResult: RuleResult) {
  const serviceMessage = new ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, MessageType.Error);
  serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
  serviceMessage.Source = this.actionName;
  this.serviceContext.Messages.push(serviceMessage);
  this.loggingService.log(this.actionName, Severity.Error, `${serviceMessage.toString()}`);
}
```  

#### Service Message with Fluent-API

The following example demonstrates the Fluent-API syntax to construct and add a new message to the Service Context.

```ts
this.serviceContext.addMessage(
      new ServiceMessage()
        .WithName('CowsOnTheLoose')
        .WithMessage('Someone let the cows out.')
        .WithDisplayToUser(true)
        .WithMessageType(MessageType.Error)
        .WithSource(this.serviceName)
    );
```    

#### Message Types

Each *ServiceMessage* is required to define a message type. Message types are useful to determine state or to change the UI display based on the type.

```ts
/**
 * Use to indicate the type for the [ServiceMessage].
 */
export enum MessageType {
  /**
   * Use to indicate the message type is informational.
   */
  Information = 1,

  /**
   * Use to indicate the message type is warning.
   */
  Warning = 2,

  /**
   * Use to indicate the message type is error.
   */
  Error = 3,
}
```

### API Response

The client and backend portions of the application need to use and have a consistent implementation of an API response. The API response needs to be in a well-known format and provide information as to the state of the response, a data payload and messages. If the response is in an error state, the response should include a list of error messages to provide details to the application.

#### Api Message

An *ApiResponse* may have one or more messages provided by the Web API/back end of the application. The base ApiMessage can be used to construct all message types: Information, Warning, or Error. The default type is: `ApiMessageType.Information`.

```ts
import { ApiMessageType } from './api-message-type.enum';

export class ApiMessage {
  id?: string;
  statusCode?: string;
  message: string;
  messageType: ApiMessageType;
  isDisplayable: boolean;

  constructor() {
    this.messageType = ApiMessageType.Information; //default;
  }
}
```

An *ApiErrorMessage* extends the *ApiMessage* with a default error type: `ApiMessageType.Error`.

```ts
import { ApiMessage } from './api-message';
import { ApiMessageType } from './api-message-type.enum';

export class ApiErrorMessage extends ApiMessage {
  /**
   * Use to create a new [ApiErrorMessage].
   *
   * @param message The error from the API.
   * @param displayable Use to indicate if the error should be displayed to the user.
   * @param id An optional identifier for the error.
   * @param statusCode An optional status code for the specified error.
   */
  constructor(message: string, displayable: boolean, id: string | null, statusCode: string | null) {
    super();
    this.messageType = ApiMessageType.Error;
    this.message = message;
    this.isDisplayable = displayable;
    if (id) {
      this.id = id;
    }
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
```

#### Base API Response

The base API response is shown below. It provides the information that is contained in either a successful or error response. 

```ts
import { ApiMessage } from './api-message';

export abstract class ApiResponse<T> {
  IsSuccess: boolean;
  Message: string;
  StatusCode: number;
  Timestamp: Date;
  Messages: ApiMessage[] = [];
}

```

#### Success

A *SuccessApiResponse* of type <T> has all the members of the ApiResponse by extension. It contains a *Data* property of type <T> - this is the payload from Web API request that return data.

```ts
import { ApiResponse } from './api-response';

/**
 * Use to define a successful API response. A successful response will
 * most likely include a payload of data (i.e., use the Data property).
 */
export class SuccessApiResponse<T> extends ApiResponse<T> {
  Data: T;
}
```

#### Error

A *ErrorApiResponse* of type <T> has all the members of the ApiResponse by extension. It contains an *Errors* collection with a lit of error messages from the Web API.

```ts
import { ApiResponse } from './api-response';
import { ApiErrorMessage } from './api-error-message';

/**
 * Use to provide error information from an API. You can also
 * use this class to create a response with errors while doing
 * error handling.
 *
 * Errors: is a list om [ApiErrorMessage] items that contain specific
 * errors for the specified request.
 */
export class ErrorApiResponse<T> extends ApiResponse<T> {
  Errors: ApiErrorMessage[] = [];
}
```
