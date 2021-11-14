import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ConfigurationContext, ConfigurationService } from '@buildmotion/configuration';
import { LoggingService } from '@buildmotion/logging';
import { HttpApplicationInfoRepositoryService } from './http-application-info-repository.service';
import { AppConfigMock } from '@buildmotion/configuration';
import { ConfigurationServiceMock } from '@buildmotion/configuration';

describe.skip('HttpApplicationInfoRepositoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: ConfigurationContext,
          useValue: { config: AppConfigMock },
        },
        LoggingService,
        {
          class: ConfigurationService,
          useClass: ConfigurationServiceMock
        }
      ],
    })
  );

  it('should be created', () => {

    const service: HttpApplicationInfoRepositoryService = TestBed.inject(HttpApplicationInfoRepositoryService);
    expect(service).toBeTruthy();
  });
});
