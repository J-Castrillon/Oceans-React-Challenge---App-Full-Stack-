import { forwardRef, Module } from '@nestjs/common';
import { UsersManageService } from './users-manage.service';
import { UsersManageController } from './users-manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersManage } from './entities/users-manage.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TipoUsuariosModule } from '../tipo-usuarios/tipo-usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersManage]),
    forwardRef(() => AuthModule),
    TipoUsuariosModule,
  ],
  controllers: [UsersManageController],
  providers: [UsersManageService],
  exports: [UsersManageService],
})
export class UsersManageModule {}
