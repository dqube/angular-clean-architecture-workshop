# Domain Service

> git checkout 6-1/accounts/domain-service

- [ ] generate `accounts-service` library project

Generate accounts-service project.

```ts
nx workspace-schematic domain-library --directory=accounts  --importPath=@buildmotion/accounts --lint=eslint --name=accounts-service --dry-run
nx workspace-schematic domain-library --directory=security  --importPath=@buildmotion/security --lint=eslint --name=security-service --dry-run
nx workspace-schematic domain-library --directory=products  --importPath=@buildmotion/security --lint=eslint --name=security-service --dry-run
nx workspace-schematic domain-library --directory=orders    --importPath=@buildmotion/security --lint=eslint --name=security-service --dry-run
nx workspace-schematic domain-library --directory=shipments --importPath=@buildmotion/security --lint=eslint --name=security-service --dry-run
```

Add an *action* to implement the business logic with business rules and/or validations.

```ts
nx workspace-schematic domain-action "createAccount" --project=accounts-service -d
```

