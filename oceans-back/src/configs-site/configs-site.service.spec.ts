import { Test, TestingModule } from '@nestjs/testing';
import { ConfigsSiteService } from './configs-site.service';

describe('ConfigsSiteService', () => {
  let service: ConfigsSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigsSiteService],
    }).compile();

    service = module.get<ConfigsSiteService>(ConfigsSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
