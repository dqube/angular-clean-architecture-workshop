/**
 * TC.Angular Component Options Schema
 * Creates a new application component (with ComponentBase) definition in the given or default project.
 */
export interface AppComponentOptions {
  /**
   * The path at which to create the component file, relative to the current workspace. Default is a folder with the same name as the component in the project root.
   */
  path?: string; // path
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * The name of the component.
   */
  name: string;
  /**
   * Specifies if the style will contain `:host { display: block; }`.
   */
  displayBlock?: boolean;
  /**
   * When true, includes styles inline in the component.ts file. Only CSS styles can be included inline. By default, an external styles file is created and referenced in the component.ts file.
   */
  inlineStyle?: boolean;
  /**
   * When true, includes template inline in the component.ts file. By default, an external template file is created and referenced in the component.ts file.
   */
  inlineTemplate?: boolean;
  /**
   * The view encapsulation strategy to use in the new component.
   */
  viewEncapsulation?: 'Emulated' | 'Native' | 'None' | 'ShadowDom';
  /**
   * The change detection strategy to use in the new component.
   */
  changeDetection?: 'Default' | 'OnPush';
  /**
   * The prefix to apply to the generated component selector.
   */
  prefix?: any | any /* html-selector */;
  /**
   * The file extension or preprocessor to use for style files.
   */
  style?: 'css' | 'scss' | 'sass' | 'less' | 'styl';
  /**
   * Adds a developer-defined type to the filename, in the format "name.type.ts".
   */
  type?: string;
  /**
   * When true, does not create "spec.ts" test files for the new component.
   */
  skipTests?: boolean;
  /**
   * When true, creates the new files at the top level of the current project.
   */
  flat?: boolean;
  /**
   * When true, does not import this component into the owning NgModule.
   */
  skipImport?: boolean;
  /**
   * The HTML selector to use for this component.
   */
  selector?: string; // html-selector
  /**
   * Specifies if the component should have a selector or not.
   */
  skipSelector?: boolean;
  /**
   * The declaring NgModule.
   */
  module?: string;
  /**
   * When true, the declaring NgModule exports this component.
   */
  export?: boolean;
  /**
   * When true, the new component is the entry component of the declaring NgModule.
   */
  entryComponent?: boolean;
  /**
   * When true, applies lint fixes after generating the component.
   */
  lintFix?: boolean;
}
