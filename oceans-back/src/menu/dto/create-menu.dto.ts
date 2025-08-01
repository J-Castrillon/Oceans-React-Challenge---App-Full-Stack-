import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ResourcesManage } from 'src/resources-manage/entities/resources-manage.entity';

export class CreateMenuDto {
  @ApiProperty({
    description: 'Tipo de producto',
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
  })
  @IsEnum(['Appetizer', 'Main Course', 'Dessert', 'Beverage'])
  @IsNotEmpty()
  readonly tipoMenu: string;

  @ApiProperty({
    description: 'Nombre del menú',
    example: 'Carne al Asador',
  })
  @IsString()
  @IsNotEmpty()
  readonly menuName: string;

  @ApiProperty({
    description: 'Descripción del menú',
    example: 'Deliciosa carne asada con guarnición',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    description: 'Precio del menú',
    example: 12.99,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    description: 'ID de la imagen del menú',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly image: ResourcesManage;
}
