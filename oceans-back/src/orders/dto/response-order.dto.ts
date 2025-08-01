import { ApiProperty } from '@nestjs/swagger';
import { CreateMenusObjectDto } from './create-menus.dto';
import { ResponseResultMenuDto } from 'src/menu/dto/responses-menu.dto';

export class MenuDto {
  @ApiProperty({
    description: 'Los menús de la orden',
    type: [CreateMenusObjectDto],
  })
  readonly menus: CreateMenusObjectDto[];

  @ApiProperty({
    description: 'El método de pago de la orden',
    enum: ['CREDIT CARD', 'DEBIT CARD', 'CASH', 'BANK TRANSFER'],
  })
  readonly paymentMethod: string;

  @ApiProperty({
    description: 'Usuario relacionado con la orden por ID',
    type: Number,
  })
  readonly user: number;

  @ApiProperty({
    description: 'Estado de la orden',
    enum: ['PENDING', 'COMPLETED', 'CANCELLED', 'IN_PROGRESS'],
    default: 'PENDING',
  })
  readonly status: string;
}

export class ResponseCreateOrderDto {
  @ApiProperty({
    example: 201,
  })
  readonly statusCode: number;

  @ApiProperty({
    example: 'Order created successfully',
  })
  readonly message: string;

  @ApiProperty({ type: MenuDto })
  readonly newOrder: MenuDto;
}

export class ResponseOrderDto {
  @ApiProperty({ type: [ResponseResultMenuDto] })
  readonly menus: ResponseResultMenuDto[];

  @ApiProperty({
    example: 1,
  })
  readonly orderId: number;

  @ApiProperty({
    example: 100.0,
  })
  readonly tip: number;

  @ApiProperty({
    example: 120.0,
  })
  readonly totalPrice: number;

  @ApiProperty({
    example: 'PENDING',
  })
  readonly status: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
  })
  readonly createdAt: string;
}

export class ResponseAllOrdersDto {
  @ApiProperty({
    example: 200,
  })
  readonly statusCode: number;

  @ApiProperty({ type: ResponseOrderDto })
  readonly orders: ResponseOrderDto;
}

export class ResponseUnicOrderDto {
  @ApiProperty({
    example: 200,
  })
  readonly statusCode: number;

  @ApiProperty({ type: ResponseOrderDto })
  readonly unicOrder: ResponseOrderDto;
}

export class ResponseUpdateOrderDto {
  @ApiProperty({
    example: 200,
  })
  readonly statusCode: number;

  @ApiProperty({ example: 'Order updated successfully' })
  readonly message: string;
}

export class ResponseDeleteOrderDto {
  @ApiProperty({
    example: 200,
  })
  readonly statusCode: number;

  @ApiProperty({ example: 'Order deleted successfully' })
  readonly message: string;
}
