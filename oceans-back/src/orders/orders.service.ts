import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { MenuService } from 'src/menu/menu.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly MenuService: MenuService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      let totalPrice = 0;
      let tip = 0;

      for (const menu of createOrderDto.menus) {
        const unicMenu = await this.MenuService.findOne(menu.menuId);

        if (!unicMenu || !unicMenu.menu) {
          throw new BadRequestException('Menu not found');
        }

        totalPrice += unicMenu.menu.price;
      }

      tip = totalPrice * 0.1;

      const newOrder = await this.orderRepository.save({
        ...createOrderDto,
        totalPrice: (totalPrice += tip),
        tip,
      });

      if (!newOrder) throw new BadRequestException('Error creating order');

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Order created successfully',
        newOrder,
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error creating order');
    }
  }

  async findAll() {
    try {
      const orders = await this.orderRepository.find();

      if (!orders) throw new BadRequestException('Orders not found');

      return {
        statusCode: HttpStatus.OK,
        orders,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error fetching orders');
    }
  }

  async findOne(id: number) {
    try {
      const unicOrder = await this.orderRepository.findOne({
        where: { orderId: id },
      });

      if (!unicOrder)
        throw new BadRequestException(HttpStatus.NOT_FOUND, 'Order not found');

      return {
        statusCode: HttpStatus.OK,
        unicOrder,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error fetching order');
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
    });

    try {
      let totalPrice = 0;
      let tip = 0;

      for (const menu of updateOrderDto?.menus ?? []) {
        const unicMenu = await this.MenuService.findOne(menu.menuId);

        if (!unicMenu || !unicMenu.menu) {
          throw new BadRequestException('Menu not found');
        }

        totalPrice += unicMenu.menu.price;
      }

      tip = totalPrice * 0.1;

      if (!order)
        throw new BadRequestException(HttpStatus.NOT_FOUND, 'Order not found');

      Object.assign(order, {
        ...updateOrderDto,
        totalPrice: (totalPrice += tip),
        tip,
      });

      await this.orderRepository.save(order);

      return {
        statusCode: HttpStatus.OK,
        message: 'Order updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error updating order');
    }
  }

  async updateStatus(id: number, status: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: { orderId: id },
      });

      if (!order)
        throw new BadRequestException(HttpStatus.NOT_FOUND, 'Order not found');

      Object.assign(order, { status });

      await this.orderRepository.save(order);

      return {
        statusCode: HttpStatus.OK,
        message: 'Order updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error updating order');
    }
  }

  async remove(id: number) {
    try {
      const order = await this.orderRepository.findOne({
        where: { orderId: id },
      });

      if (!order)
        throw new BadRequestException(HttpStatus.NOT_FOUND, 'Order not found');

      await this.orderRepository.delete(+id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Order deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error deleting order');
    }
  }
}
