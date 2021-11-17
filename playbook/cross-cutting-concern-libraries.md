# Cross-Cutting Concern Libraries

> TODO: ADD INFORMATION ABOUT CROSS-CUTTING CONCERNS

Create library projects.

```ts
nx g @nrwl/angular:library configuration    --simpleModuleName --linter=eslint --importPath=@buildmotion/configuration
nx g @nrwl/angular:library rule-engine      --simpleModuleName --linter=eslint --importPath=@buildmotion/rule-engine
nx g @nrwl/angular:library logging          --simpleModuleName --linter=eslint --importPath=@buildmotion/logging
nx g @nrwl/angular:library error-handling   --simpleModuleName --linter=eslint --importPath=@buildmotion/error-handling
nx g @nrwl/angular:library actions          --simpleModuleName --linter=eslint --importPath=@buildmotion/actions
nx g @nrwl/angular:library common           --simpleModuleName --linter=eslint --importPath=@buildmotion/common
nx g @nrwl/angular:library http-service     --simpleModuleName --linter=eslint --importPath=@buildmotion/http-service
nx g @nrwl/angular:library foundation       --simpleModuleName --linter=eslint --importPath=@buildmotion/foundation
nx g @nrwl/angular:library validation       --simpleModuleName --linter=eslint --importPath=@buildmotion/validation
nx g @nrwl/angular:library notifications    --simpleModuleName --linter=eslint --importPath=@buildmotion/notifications
nx g @nrwl/angular:library version-check    --simpleModuleName --linter=eslint --importPath=@buildmotion/version-check
nx g @nrwl/angular:library analytics        --simpleModuleName --linter=eslint --importPath=@buildmotion/analytics
```

Move code into the library projects.

> cp -R ./configuration/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/configuration

```ts
cp -R ./configuration/src   ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/configuration
cp -R ./rule-engine/src     ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/rule-engine
cp -R ./logging/src         ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/logging
cp -R ./error-handling/src  ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/error-handling
cp -R ./actions/src         ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/actions
cp -R ./common/src          ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/common
cp -R ./http-service/src    ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/http-service
cp -R ./foundation/src      ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/foundation
cp -R ./validation/src      ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/validation
cp -R ./notifications/src   ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/notifications
cp -R ./version-check/src   ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/version-check
cp -R ./analytics/src       ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/analytics
```

## Configuration and Cross-Cutting Concerns

Need to create configuration for the application that can be provided to the injectable services from the libraries.

1. add configuration
2. setup and provide the cross-cutting concerns

```ts
nx g @nrwl/angular:module crossCutting --flat   
CREATE apps/black-dashboard/src/app/cross-cutting.module.ts
```

## DataDog Logging and Analytics

Create Application Id/Key:

> Key: 92719441096c12bebde673af4216f72fb59d6cb8

```ts
KEY ID
aec645ca-5972-4168-8ffc-f8674bf7c33f
KEY
92719441096c12bebde673af4216f72fb59d6cb8
```

Email Information:

> More information here: https://docs.datadoghq.com/events/guides/email/?tab=json

```ts
event-hoz8bn44@dtdg.co
```