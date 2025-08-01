import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { TipoUsuario } from 'src/users-typeUsers/tipo-usuarios/entities/tipo-usuario.entity';

export class CreateUsersManageDto {
  @ApiProperty({
    description: 'Número de documento del usuario',
    example: 123456789,
    minimum: 100000000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(100000000)
  readonly document: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Perez',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly password: string;

  @ApiProperty({
    description: 'Edad del usuario',
    example: 30,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '1990-01-01',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly dateOfBirth: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly role: TipoUsuario;
}
