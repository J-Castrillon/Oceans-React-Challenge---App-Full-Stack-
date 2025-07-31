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
  @IsNumber()
  @IsNotEmpty()
  @Min(100000000)
  readonly document: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @IsString()
  @IsOptional()
  readonly dateOfBirth: string;

  @IsNumber()
  @IsNotEmpty()
  readonly role: TipoUsuario;
}
