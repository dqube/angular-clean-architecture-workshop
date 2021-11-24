import { TestBed } from '@angular/core/testing';
import { LoggingService, LoggingServiceMock } from '@buildmotion/logging';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggingService,
          useClass: LoggingServiceMock
        }
      ]
    });
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
