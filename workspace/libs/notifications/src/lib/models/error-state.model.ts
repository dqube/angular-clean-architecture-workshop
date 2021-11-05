import { ErrorStateOperation } from './error-state-operation.model';

/**
 * Use as the container for API error state managment.
 */
export class ErrorState {
  operation: ErrorStateOperation | undefined;
}
