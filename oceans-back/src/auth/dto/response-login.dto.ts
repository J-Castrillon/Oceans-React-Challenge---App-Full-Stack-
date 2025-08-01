import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponseLoginDto {
  @ApiProperty({
    description: 'Token de acceso del usuario',
    example: 'eyJhbGciOiJIUzI1NiIsInR5',
  })
  @IsString()
  readonly token: string;
}
