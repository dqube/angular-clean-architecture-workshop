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

