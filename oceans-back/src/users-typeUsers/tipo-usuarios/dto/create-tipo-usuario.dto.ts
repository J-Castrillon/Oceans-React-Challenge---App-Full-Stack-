import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsString, MinLength } from 'class-validator';
import { Views } from 'src/auth/enums/views.enum';

export class CreateTipoUsuarioDto {
  @ApiProperty({
    description: 'Nombre del rol del tipo de usuario',
    example: 'Administrador',
  })
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(3)
  readonly roleName: string;

  @ApiProperty({
    description: 'Descripción del tipo de usuario',
    example: 'Este es un tipo de usuario administrador',
  })
  @IsString()
  @MinLength(10)
  readonly description: string;

  @ApiProperty({
    description: 'Nivel de acceso del tipo de usuario',
    example: ['DASHBOARD', 'ADMIN'],
  })
  @IsArray()
  @IsEnum(Views, { each: true })
  readonly accesLevel: string[];
}
