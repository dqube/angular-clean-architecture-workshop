import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpServiceModule } from './http-service.module';

describe('HttpServiceModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpServiceModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(HttpServiceModule).toBeDefined();
  });
});
