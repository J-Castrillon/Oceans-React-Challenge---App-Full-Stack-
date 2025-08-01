import { Test, TestingModule } from '@nestjs/testing';
import { ConfigsSiteController } from './configs-site.controller';
import { ConfigsSiteService } from './configs-site.service';

describe('ConfigsSiteController', () => {
  let controller: ConfigsSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigsSiteController],
      providers: [ConfigsSiteService],
    }).compile();

    controller = module.get<ConfigsSiteController>(ConfigsSiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
