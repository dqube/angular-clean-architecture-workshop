/**
 * Angular Service Options Schema
 * Creates a new, generic service definition in the given or default project.
 */
export interface DomainServiceOptions {
  /**
   * The name of the service.
   */
  name: string;
  /**
   * The path at which to create the service, relative to the workspace root.
   */
  path?: string; // path
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * When true (the default), creates files at the top level of the project.
   */
  flat?: boolean;
  /**
   * When true, does not create "spec.ts" test files for the new service.
   */
  skipTests?: boolean;
  /**
   * When true, applies lint fixes after generating the service.
   */
  lintFix?: boolean;
}
