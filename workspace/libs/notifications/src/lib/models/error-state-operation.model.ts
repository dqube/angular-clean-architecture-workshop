/**
 * Use to define error state mappings for a specific API operation.
 */
export class ErrorStateOperation {
  domain: string;
  operation: string;
  errors: Map<string, boolean> = new Map<string, boolean>();

  constructor(operation: string, domain: string) {
    this.operation = operation;
    this.domain = domain;
  }
}
