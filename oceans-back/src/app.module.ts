import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourcesManageModule } from './resources-manage/resources-manage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersManageModule } from './users-typeUsers/users-manage/users-manage.module';
import { TipoUsuariosModule } from './users-typeUsers/tipo-usuarios/tipo-usuario.module';
import { OrdersModule } from './orders/orders.module';
import { MenuModule } from './menu/menu.module';
import { ConfigsSiteModule } from './configs-site/configs-site.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        schema: 'public',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        retryDelay: 3000,
        retryAttempts: 2,
      }),
    }),
    ResourcesManageModule,
    AuthModule,
    UsersManageModule,
    TipoUsuariosModule,
    OrdersModule,
    MenuModule,
    ConfigsSiteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
