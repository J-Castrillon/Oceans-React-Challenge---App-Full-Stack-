import { ApiProperty } from '@nestjs/swagger';
import { ResourceUploadResponseDto } from 'src/resources-manage/dto/response-resources.dto';
import { Timestamp } from 'typeorm';

export class ResponseMenuDto {
  @ApiProperty({ example: 'Appetizer' })
  readonly tipoMenu: string;

  @ApiProperty({ example: 'Carne al Asador' })
  readonly menuName: string;

  @ApiProperty({ example: 'Deliciosa carne asada con guarnición' })
  readonly description: string;

  @ApiProperty({ example: 25.99 })
  readonly price: number;

  @ApiProperty({ example: 3 })
  readonly image: number;

  @ApiProperty({ example: 1 })
  readonly menuId: number;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  readonly createdAt: string;
}

export class ResponseResultMenuDto {
  @ApiProperty({ example: 'Appetizer' })
  readonly tipoMenu: string;

  @ApiProperty({ example: 'Carne al Asador' })
  readonly menuName: string;

  @ApiProperty({ example: 'Deliciosa carne asada con guarnición' })
  readonly description: string;

  @ApiProperty({ example: 25.99 })
  readonly price: number;

  @ApiProperty({ type: ResourceUploadResponseDto })
  readonly image: ResourceUploadResponseDto;

  @ApiProperty({ example: 1 })
  readonly menuId: number;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  readonly createdAt: string;
}

export class ResponsesCreateMenuDto {
  @ApiProperty({ example: 201 })
  readonly statusCode: number;

  @ApiProperty({ example: 'Menu created successfully' })
  readonly message: string;

  @ApiProperty({ type: ResponseMenuDto })
  readonly newMenu: ResponseMenuDto;
}

export class ResponsesResultsMenuDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ type: [ResponseResultMenuDto] })
  readonly menus: ResponseResultMenuDto[];
}

export class ResponseDeleteResultsMenuDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ example: 'Menu deleted successfully' })
  readonly message: string;
}
