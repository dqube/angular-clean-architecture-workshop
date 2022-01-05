import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProviderService } from './business-provider.service';

describe('BusinessProviderService', () => {
  let service: BusinessProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessProviderService],
    }).compile();

    service = module.get<BusinessProviderService>(BusinessProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
