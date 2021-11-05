import { TestBed, waitForAsync } from '@angular/core/testing';
import { ConfigurationModule } from './configuration.module';

describe('ConfigurationModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ConfigurationModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(ConfigurationModule).toBeDefined();
  });
});
