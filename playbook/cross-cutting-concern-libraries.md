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
```

Move code into the library projects.

> cp -R ./configuration/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/configuration

```ts
cp -R ./configuration/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/configuration
cp -R ./rule-engine/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/rule-engine
cp -R ./logging/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/logging
cp -R ./error-handling/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/error-handling
cp -R ./actions/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/actions
cp -R ./common/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/common
cp -R ./http-service/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/http-service
cp -R ./foundation/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/foundation
cp -R ./validation/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/validation
cp -R ./notifications/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/notifications
cp -R ./version-check/src ../../../../../work/github/angular-clean-architecture-workshop/workspace/libs/version-check
```