import { async, TestBed } from '@angular/core/testing';
import { VersionCheckModule } from './version-check.module';

describe('VersionCheckModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VersionCheckModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(VersionCheckModule).toBeDefined();
  });
});
