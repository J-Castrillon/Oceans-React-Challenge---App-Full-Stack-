import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateMenusObjectDto } from './create-menus.dto';
import { Type } from 'class-transformer';
import { UsersManage } from 'src/users-typeUsers/users-manage/entities/users-manage.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Los menús de la orden',
    type: [CreateMenusObjectDto],
  })
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CreateMenusObjectDto)
  @IsNotEmpty()
  readonly menus: CreateMenusObjectDto[];

  @ApiProperty({
    description: 'El método de pago de la orden',
    enum: ['CREDIT CARD', 'DEBIT CARD', 'CASH', 'BANK TRANSFER'],
  })
  @IsEnum(['CREDIT CARD', 'DEBIT CARD', 'CASH', 'BANK TRANSFER'])
  @IsNotEmpty()
  readonly paymentMethod: string;

  @ApiProperty({
    description: 'Usuario relacionado con la orden por ID',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly user: UsersManage;

  @ApiProperty({
    description: 'Estado de la orden',
    enum: ['PENDING', 'COMPLETED', 'CANCELLED', 'IN_PROGRESS'],
    default: 'PENDING',
  })
  @IsEnum(['PENDING', 'COMPLETED', 'CANCELLED', 'IN_PROGRESS'])
  @IsOptional()
  readonly status: string;
}
