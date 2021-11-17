/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Rule, Tree, apply, applyTemplates, chain, filter, mergeWith, move, noop, url } from '@angular-devkit/schematics';

import { DomainActionOptions } from './schema';
import { applyLintFix } from '@schematics/angular/utility/lint-fix';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';

export default function (options: DomainActionOptions): Rule {
  return async (host: Tree) => {
    if (options.path === undefined) {
      options.path = await createDefaultPath(host, options.project as string);
    }

    options.type = !!options.type ? `.${options.type}` : '';

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    // path: `libs/${options.directory}/${options.name}/src/lib`,

    const templateSource = apply(url('./files'), [
      options.skipTests ? filter((path) => !path.endsWith('.spec.ts.template')) : noop(),
      applyTemplates({
        ...strings,
        ...options,
      }),
      move(`${parsedPath.path}/business/actions`),
    ]);

    return chain([mergeWith(templateSource), options.lintFix ? applyLintFix(options.path) : noop()]);
  };
}
