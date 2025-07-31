import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateResourcesManageDto {
  @IsString()
  @MinLength(3)
  readonly description: string;

  @IsEnum(['active', 'inactive', 'archived'])
  @IsNotEmpty()
  readonly status: string;
}
