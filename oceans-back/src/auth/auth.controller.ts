import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseLoginDto } from './dto/response-login.dto';
import { Auth } from './decorators/auth.decorator';
import { Views } from './enums/views.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Inicia sesión con el usuario' })
  @ApiCreatedResponse({
    description: 'Inicio de sesión exitoso',
    type: ResponseLoginDto,
  })
  @Public()
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new InternalServerErrorException('Login Error');
    }
  }

  @Get('validate-token')
  @Auth(Views.DASHBOARD, Views.DASHBOARD)
  getProfile() {
    return true; // Token válido
  }
}
