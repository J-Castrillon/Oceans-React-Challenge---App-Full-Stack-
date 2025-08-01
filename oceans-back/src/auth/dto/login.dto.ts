import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Número de documento del usuario',
    example: 1000757234,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly document: number;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
