import { Rule, chain, externalSchematic, schematic } from '@angular-devkit/schematics';

import { DomainLibraryOptions } from './schema';
import { dasherize } from '@angular-devkit/core/src/utils/strings';

export default function (options: DomainLibraryOptions): Rule {
  return chain([
    externalSchematic('@nrwl/angular', 'lib', {
      directory: options.directory ? options.directory : '',
      importPath: options.importPath,
      name: options.name,
      simpleModuleName: true,
      style: 'scss',
    }),
    schematic('domain-service', {
      name: dasherize(options.name),
      path: options.directory ? `libs/${options.directory}/${options.name}/src/lib` : `libs/${options.name}/src/lib`,
      project: options.directory ? `${dasherize(options.directory)}-(${dasherize(options.name)}` : `${dasherize(options.name)}`,
      flat: true,
      skipTests: true,
    }),
  ]);
}
