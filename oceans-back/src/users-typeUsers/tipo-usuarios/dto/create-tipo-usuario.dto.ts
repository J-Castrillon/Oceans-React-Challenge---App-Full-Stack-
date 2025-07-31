import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsString, MinLength } from 'class-validator';
import { Views } from 'src/auth/enums/views.enum';

export class CreateTipoUsuarioDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(3)
  readonly roleName: string;

  @IsString()
  @MinLength(10)
  readonly description: string;

  @IsArray()
  @IsEnum(Views, { each: true })
  readonly accesLevel: string[];
}
