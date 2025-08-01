import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMenusObjectDto {
  @ApiProperty({ description: 'ID del menú' })
  @IsNumber()
  @IsNotEmpty()
  readonly menuId: number;
}
