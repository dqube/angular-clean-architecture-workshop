import { TestBed, waitForAsync } from '@angular/core/testing';
import { LoggingModule } from './logging.module';

describe('LoggingModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LoggingModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LoggingModule).toBeDefined();
  });
});
