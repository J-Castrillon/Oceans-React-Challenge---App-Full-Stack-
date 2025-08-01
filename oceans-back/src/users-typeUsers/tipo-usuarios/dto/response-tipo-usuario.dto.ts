import { ApiProperty } from '@nestjs/swagger';

export class ResponseTipoUsuarioDto {
  @ApiProperty({ example: 'Administrador' })
  readonly roleName: string;

  @ApiProperty({ example: 'Este es un tipo de usuario administrador' })
  readonly description: string;

  @ApiProperty({ example: ['DASHBOARD', 'ADMIN'] })
  readonly accesLevel: string[];

  @ApiProperty({ example: 1 })
  readonly roleId: number;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  readonly created_at: string;
}

export class CreateTipoUsuarioResponseDto {
  @ApiProperty({ example: 201 })
  readonly statusCode: number;

  @ApiProperty({ example: 'User type created successfully' })
  readonly message: string;

  @ApiProperty({ type: ResponseTipoUsuarioDto })
  readonly newType: ResponseTipoUsuarioDto;
}

export class TiposUsuariosResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ type: [ResponseTipoUsuarioDto] })
  readonly typeUsers: ResponseTipoUsuarioDto[];
}

export class UnicTipoUsuarioResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ type: ResponseTipoUsuarioDto })
  readonly unicRole: ResponseTipoUsuarioDto;
}

export class DeleteTipoUsuarioResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ example: 'User type deleted successfully' })
  readonly message: string;

  @ApiProperty({ type: ResponseTipoUsuarioDto['roleName'] })
  readonly 'User type deleted': ResponseTipoUsuarioDto['roleName'];
}
