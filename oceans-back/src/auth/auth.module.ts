import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from 'src/constants/jwtConstants';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { TipoUsuariosModule } from 'src/users-typeUsers/tipo-usuarios/tipo-usuario.module';
import { UsersManageModule } from 'src/users-typeUsers/users-manage/users-manage.module';

@Module({
  imports: [
    TipoUsuariosModule,
    forwardRef(() => UsersManageModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: jwtConstants(configService).SECRET,
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard],
  exports: [AuthService, AuthGuard, RolesGuard, JwtModule],
})
export class AuthModule {}
