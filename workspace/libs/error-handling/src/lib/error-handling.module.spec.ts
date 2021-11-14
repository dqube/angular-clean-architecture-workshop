import { TestBed, waitForAsync } from '@angular/core/testing';
import { ErrorHandlingModule } from './error-handling.module';

describe('ErrorHandlingModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ErrorHandlingModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(ErrorHandlingModule).toBeDefined();
  });
});
