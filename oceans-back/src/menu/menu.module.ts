import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TipoUsuariosModule } from 'src/users-typeUsers/tipo-usuarios/tipo-usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), AuthModule, TipoUsuariosModule],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService, TypeOrmModule],
})
export class MenuModule {}
