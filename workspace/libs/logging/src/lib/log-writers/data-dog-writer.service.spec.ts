import { TestBed } from '@angular/core/testing';
import { ConfigurationService, ConfigurationServiceMock } from '@buildmotion/configuration';
import { LoggingService } from '../logging.service';
import { LoggingServiceMock } from '../logging.service.mock';

import { DataDogWriterService } from './data-dog-writer.service';

describe('DataDogWriterService', () => {
  let service: DataDogWriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigurationService,
          useClass: ConfigurationServiceMock
        },
        {
          provide: LoggingService,
          useClass: LoggingServiceMock
        }
      ]
    });
    service = TestBed.inject(DataDogWriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
