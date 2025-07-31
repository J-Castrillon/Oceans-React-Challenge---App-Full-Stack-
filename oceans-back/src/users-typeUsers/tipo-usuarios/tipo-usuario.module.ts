import { forwardRef, Module } from '@nestjs/common';
import { TipoUsuariosService } from './tipo-usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuario } from './entities/tipo-usuario.entity';
import { TipoUsuarioController } from './tipo-usuario.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TipoUsuario]), forwardRef(() => AuthModule)],
  controllers: [TipoUsuarioController],
  providers: [TipoUsuariosService],
  exports: [TipoUsuariosService],
})
export class TipoUsuariosModule {}
