import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TipoUsuariosModule } from 'src/users-typeUsers/tipo-usuarios/tipo-usuario.module';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), AuthModule, TipoUsuariosModule, MenuModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
