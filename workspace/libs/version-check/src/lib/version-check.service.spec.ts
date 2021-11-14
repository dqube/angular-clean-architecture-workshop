import { TestBed, inject } from '@angular/core/testing';

import { VersionCheckService } from './version-check.service';
import { HttpApplicationInfoRepositoryService } from './business/http-application-info-repository.service';
import { HttpApplicationInfoRepositoryMockService } from './business/http-application-info-repository-mock.service';
import { BusinessProviderService } from './business/business-provider.service';
import { ConfigurationService, ConfigurationServiceMock } from '@buildmotion/configuration';
import { LoggingService, LoggingServiceMock } from '@buildmotion/logging';
import { BusinessProviderServiceMock } from './business/business-provider.service.mock';
import { HttpClientModule } from '@angular/common/http';
import { VersionInfo } from '@buildmotion/common';

export const versionInfo = { version: '0.0.0', timestamp: '2021-08-04T21:35:51.429Z' };

describe('VersionCheckService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: VersionInfo,
          useValue: versionInfo,
        },
        {
          provide: BusinessProviderService,
          useClass: BusinessProviderServiceMock,
        },
        {
          provide: ConfigurationService,
          useClass: ConfigurationServiceMock,
        },
        {
          provide: LoggingService,
          useClass: LoggingServiceMock,
        },
        {
          provide: HttpApplicationInfoRepositoryService,
          useClass: HttpApplicationInfoRepositoryMockService,
        },
        VersionCheckService,
      ],
    })
  );

  it('should be created', () => {
    const service: VersionCheckService = TestBed.get(VersionCheckService);
    expect(service).toBeTruthy();
  });

  it('should indicate reload is requested if no reload date is available', () => {
    const service: VersionCheckService = TestBed.inject(VersionCheckService);
    service.reloadOnDemand();
    expect(service.isReloadRequested).toEqual(true);
  });
});
