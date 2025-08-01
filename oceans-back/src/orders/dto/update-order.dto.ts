import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class UpdateStateOrderDto {
  @IsEnum(['PENDING', 'COMPLETED', 'CANCELLED', 'IN_PROGRESS'])
  @IsNotEmpty()
  readonly status: string;
}
