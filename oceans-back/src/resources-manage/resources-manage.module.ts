import { Module } from '@nestjs/common';
import { ResourcesManageService } from './resources-manage.service';
import { ResourcesManageController } from './resources-manage.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesManage } from './entities/resources-manage.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TipoUsuariosModule } from 'src/users-typeUsers/tipo-usuarios/tipo-usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResourcesManage]),
    MulterModule.register({
      limits: {
        fileSize: 50 * 1024 * 1024,
      },
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return [
          {
            rootPath: join(process.cwd(), 'Uploads'),
            serveRoot: '/static',
            renderPath: '/',
            exclude: ['/api*'],
          },
        ];
      },
    }),
    AuthModule,
    TipoUsuariosModule,
  ],
  controllers: [ResourcesManageController],
  providers: [ResourcesManageService],
})
export class ResourcesManageModule {}
