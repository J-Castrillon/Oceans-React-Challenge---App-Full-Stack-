import { ApiProperty } from '@nestjs/swagger';
import { ResponseTipoUsuarioDto } from 'src/users-typeUsers/tipo-usuarios/dto/response-tipo-usuario.dto';

export class UserDto {
  @ApiProperty({ example: 12345678 })
  readonly document: number;

  @ApiProperty({ example: 'Juan Perez' })
  readonly name: string;

  @ApiProperty({ example: 'juan.perez@example.com' })
  readonly email: string;

  @ApiProperty({ example: 'password123' })
  readonly password: string;

  @ApiProperty({ example: 30 })
  readonly age: number;

  @ApiProperty({ example: '1993-05-15' })
  readonly dateOfBirth: string;

  @ApiProperty({ type: ResponseTipoUsuarioDto })
  readonly role: ResponseTipoUsuarioDto;

  @ApiProperty({ example: 0 })
  readonly totalSales: number;

  @ApiProperty({ example: 'active' })
  readonly status: string;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  readonly createdAt: string;
}

export class ResponseUserDto {
  @ApiProperty({
    example: 201,
  })
  readonly statusCode: number;
  @ApiProperty({
    example: 'User created successfully',
  })
  readonly message: string;
  @ApiProperty({
    type: UserDto,
  })
  readonly newUser: UserDto;
}

export class ResponseAllUsersDto {
  @ApiProperty({
    example: 201,
  })
  readonly statusCode: number;

  @ApiProperty({
    example: 'Users fetched successfully',
  })
  readonly message: string;

  @ApiProperty({
    type: [UserDto],
  })
  readonly users: UserDto[];
}

export class ResponseOneUserDto {
  @ApiProperty({
    example: 201,
  })
  readonly statusCode: number;

  @ApiProperty({
    example: 'Users fetched successfully',
  })
  readonly message: string;

  @ApiProperty({
    type: UserDto,
  })
  readonly user: UserDto;
}

export class ResponseUpdateUserDto {
    @ApiProperty({
        example: 200,
    })
    readonly statusCode: number;
    
    @ApiProperty({
        example: 'User updated successfully',
    })
    readonly message: string;
}

export class ResponseDeleteUserDto {
    @ApiProperty({
        example: 200,
    })
    readonly statusCode: number;
    
    @ApiProperty({
        example: 'User deleted successfully',
    })
    readonly message: string;
}