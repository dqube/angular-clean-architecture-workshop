import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { LoggingService, LoggingServiceMock } from '@buildmotion/logging';

import { MatomoService } from './matomo.service';

describe('MatomoService', () => {
  let service: MatomoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: LoggingService,
          useClass: LoggingServiceMock
        }
      ]
    });
    service = TestBed.inject(MatomoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
