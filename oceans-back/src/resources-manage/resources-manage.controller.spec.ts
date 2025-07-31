import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesManageController } from './resources-manage.controller';
import { ResourcesManageService } from './resources-manage.service';

describe('ResourcesManageController', () => {
  let controller: ResourcesManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesManageController],
      providers: [ResourcesManageService],
    }).compile();

    controller = module.get<ResourcesManageController>(ResourcesManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
