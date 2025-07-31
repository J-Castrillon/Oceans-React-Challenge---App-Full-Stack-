import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsNumber()
  @IsNotEmpty()
  readonly document: number;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
