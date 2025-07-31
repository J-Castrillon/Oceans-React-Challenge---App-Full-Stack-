import { ApiProperty } from '@nestjs/swagger';

export class ResourceUploadResponseDto {
  @ApiProperty({ example: 'Imagen de prueba' })
  readonly description: string;

  @ApiProperty({ example: 'active', enum: ['active', 'inactive', 'archived'] })
  readonly status: string;

  @ApiProperty({ example: 'calendarnuevo' })
  readonly resourceName: string;

  @ApiProperty({ example: 'png' })
  readonly extension: string;

  @ApiProperty({ example: 97896 })
  readonly size: number;

  @ApiProperty({ example: 2 })
  readonly resourceId: number;

  @ApiProperty({ example: '2025-07-31T04:08:41.996Z' })
  readonly lastModified: string;

  @ApiProperty({ example: '2025-07-31T04:08:41.996Z' })
  readonly created_at: string;

  @ApiProperty({ example: 'http://localhost:3000/static/calendarnuevo.png' })
  readonly path: string;
}

export class ResponseAllResourcesDto {
    @ApiProperty({
        example: 200
    })
    readonly statusCode: number;

    @ApiProperty({
        type: [ResourceUploadResponseDto]
    })
    readonly files: ResourceUploadResponseDto[];
}

export class ResponseOneResourceDto {
    @ApiProperty({
        example: 200
    })
    readonly statusCode: number;

    @ApiProperty({
        type: ResourceUploadResponseDto
    })
    readonly resource: ResourceUploadResponseDto;
}

export class ResponseDeleteResourceDto {
    @ApiProperty({
        example: 200
    })
    readonly statusCode: number;

    @ApiProperty({
        example: 'Resource deleted successfully'
    })
    readonly message: string;

    @ApiProperty({
        type: ResourceUploadResponseDto
    })
    readonly resource: ResourceUploadResponseDto;
}