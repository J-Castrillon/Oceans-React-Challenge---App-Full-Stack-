import { Test, TestingModule } from '@nestjs/testing';
import { TipoUsuarioController } from './tipo-usuario.controller';
import { TipoUsuariosService } from './tipo-usuario.service';

describe('TypeUsersController', () => {
  let controller: TipoUsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoUsuarioController],
      providers: [TipoUsuariosService],
    }).compile();

    controller = module.get<TipoUsuarioController>(TipoUsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
