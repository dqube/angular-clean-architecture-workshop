# Cross-Cutting Concern Libraries

> TODO: ADD INFORMATION ABOUT CROSS-CUTTING CONCERNS

Create library projects.

```ts
nx g @nrwl/angular:library configuration    --simpleModuleName --linter=eslint --importPath=@buildmotion/configuration --dry-run
nx g @nrwl/angular:library rule-engine      --simpleModuleName --linter=eslint --importPath=@buildmotion/rule-engine --dry-run
nx g @nrwl/angular:library logging          --simpleModuleName --linter=eslint --importPath=@buildmotion/logging --dry-run
nx g @nrwl/angular:library error-handling   --simpleModuleName --linter=eslint --importPath=@buildmotion/error-handling --dry-run
nx g @nrwl/angular:library actions          --simpleModuleName --linter=eslint --importPath=@buildmotion/actions --dry-run
nx g @nrwl/angular:library common           --simpleModuleName --linter=eslint --importPath=@buildmotion/common --dry-run
nx g @nrwl/angular:library http-service     --simpleModuleName --linter=eslint --importPath=@buildmotion/http-service --dry-run
nx g @nrwl/angular:library foundation       --simpleModuleName --linter=eslint --importPath=@buildmotion/foundation --dry-run
nx g @nrwl/angular:library validation       --simpleModuleName --linter=eslint --importPath=@buildmotion/validation --dry-run
nx g @nrwl/angular:library notifications    --simpleModuleName --linter=eslint --importPath=@buildmotion/notifications --dry-run
nx g @nrwl/angular:library version-check    --simpleModuleName --linter=eslint --importPath=@buildmotion/version-check --dry-run
```

