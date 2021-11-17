import { Rule, Tree, apply, applyTemplates, chain, filter, mergeWith, move, noop, url } from '@angular-devkit/schematics';

import { UIServiceOptions } from './schema';
import { applyLintFix } from '@schematics/angular/utility/lint-fix';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { parseName } from '@schematics/angular/utility/parse-name';
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { strings } from '@angular-devkit/core';

export default function (options: UIServiceOptions): Rule {
  return async (host: Tree) => {
    let projectPath = await createDefaultPath(host, options.project as string);
    if (options.path === undefined) {
      throw console.error(`The [path] option is required.`);
    }
    options.type = !!options.type ? `.${options.type}` : '';
    const parsedPath = parseName(`${projectPath}/${options.path}`, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url('./files'), [
      options.skipTests ? filter((path) => !path.endsWith('.spec.ts.template')) : noop(),
      applyTemplates({
        ...strings,
        ...options,
      }),
      move(parsedPath.path),
    ]);

    return chain([mergeWith(templateSource), options.lintFix ? applyLintFix(options.path) : noop()]);
  };
}
