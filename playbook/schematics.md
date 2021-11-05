# Schematics

> Mike Brocchi

A library that has a loose association with Angular. Stand-alone library and tool-set. Can generate things for many different technologies.

> Angular CLI uses Schematics

```ts
ng new <name> # creates a workspace
```

- Generate `g` command for the Angular CLI.
- `ng update`: updates to a target version of Angular to determine what migrations need to be executed from the start to the target version. The `migrations` is a schematic to make changes to the code base to evaluate the migration

```ts
@angular-devkit/schematics-cli@12.2.2
@schematics/angular
@angular/cli@12.2.2
npm@7.21.0
```

- `Tree` is an in-memory/virtual representation of the `root` of the directory structure and its folders/files
  - pulls items from the disc and can make changes, but doesn't persist/commit to the file system unless the `rules` are valid without any errors

see: https://github.com/phenomnomnominal/tsquery for TypeScript AST