export interface DomainLibraryOptions {
  /**
   * Library name
   */
  name: string; // ^[a-zA-Z]{1}.*$
  /**
   * A directory where the lib is placed
   */
  directory?: string;
  /**
   * Generate a publishable library.
   */
  publishable?: boolean;
  /**
   * Generate a buildable library.
   */
  buildable?: boolean;
  /**
   * The prefix to apply to generated selectors.
   */
  prefix?: string; // html-selector
  /**
   * Skip formatting files
   */
  skipFormat?: boolean;
  /**
   * Keep the module name simple (when using --directory)
   */
  simpleModuleName?: boolean;
  /**
   * Add a module spec file.
   */
  addModuleSpec?: boolean;
  /**
   * Do not add dependencies to package.json.
   */
  skipPackageJson?: boolean;
  /**
   * Do not update tsconfig.json for development experience.
   */
  skipTsConfig?: boolean;
  /**
   * The file extension to be used for style files.
   */
  style?: string;
  /**
   * Add router configuration. See lazy for more information.
   */
  routing?: boolean;
  /**
   * Add RouterModule.forChild when set to true, and a simple array of routes when set to false.
   */
  lazy?: boolean;
  /**
   * Update the router configuration of the parent module using loadChildren or children, depending on what `lazy` is set to.
   */
  parentModule?: string;
  /**
   * Add tags to the library (used for linting)
   */
  tags?: string;
  /**
   * Test runner to use for unit tests
   */
  unitTestRunner?: 'karma' | 'jest' | 'none';
  /**
   * The library name used to import it, like @myorg/my-awesome-lib. Must be a valid npm name.
   */
  importPath: string;
  /**
   * Creates a library with stricter type checking and build optimization options.
   */
  strict?: boolean;
  /**
   * The tool to use for running lint checks.
   */
  linter?: 'tslint' | 'eslint';
}
