import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesManageService } from './resources-manage.service';

describe('ResourcesManageService', () => {
  let service: ResourcesManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourcesManageService],
    }).compile();

    service = module.get<ResourcesManageService>(ResourcesManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
