import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TipoUsuariosService } from './tipo-usuario.service';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Views } from 'src/auth/enums/views.enum';

@Controller('type-users')
@Auth(Views.DASHBOARD)
export class TipoUsuarioController {
  constructor(private readonly typeUsersService: TipoUsuariosService) {}

  @Post()
  async create(@Body() createTypeUserDto: CreateTipoUsuarioDto) {
    try {
      return await this.typeUsersService.create(createTypeUserDto);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Create Type User Error',
        error: error.message,
      };
    }
  }

  @Get('')
  async findAll() {
    try {
      return await this.typeUsersService.findAll();
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Find All Type Users Error',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.typeUsersService.findOne(+id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Find Type User Error',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTypeUserDto: UpdateTipoUsuarioDto,
  ) {
    try {
      return await this.typeUsersService.update(+id, updateTypeUserDto);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Update Type User Error',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.typeUsersService.remove(id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Delete Type User Error',
        error: error.message,
      };
    }
  }
}
