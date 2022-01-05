import { Test, TestingModule } from '@nestjs/testing';
import { AccountsBLService } from './accounts-bl.service';

describe('AccountsBlService', () => {
  let service: AccountsBLService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsBLService],
    }).compile();

    service = module.get<AccountsBLService>(AccountsBLService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
