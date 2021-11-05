import { TestBed, waitForAsync } from '@angular/core/testing';
import { FoundationModule } from './foundation.module';

describe('FoundationModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FoundationModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(FoundationModule).toBeDefined();
  });
});
