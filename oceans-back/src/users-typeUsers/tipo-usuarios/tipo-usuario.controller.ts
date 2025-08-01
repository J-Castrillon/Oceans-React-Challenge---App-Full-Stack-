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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Views } from 'src/auth/enums/views.enum';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateTipoUsuarioResponseDto,
  DeleteTipoUsuarioResponseDto,
  TiposUsuariosResponseDto,
  UnicTipoUsuarioResponseDto,
} from './dto/response-tipo-usuario.dto';

@Controller('type-users')
@Auth(Views.DASHBOARD)
export class TipoUsuarioController {
  constructor(private readonly typeUsersService: TipoUsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo tipo de usuario' })
  @ApiCreatedResponse({
    description: 'Tipo de usuario creado exitosamente',
    type: CreateTipoUsuarioResponseDto,
  })
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
  @ApiOperation({ summary: 'Obtiene todos los tipos de usuario' })
  @ApiOkResponse({
    description: 'Lista de tipos de usuario obtenida exitosamente',
    type: TiposUsuariosResponseDto,
  })
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
  @ApiOperation({ summary: 'Obtiene un tipo de usuario por ID' })
  @ApiCreatedResponse({
    description: 'Tipo de usuario obtenido exitosamente',
    type: UnicTipoUsuarioResponseDto,
  })
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
  @ApiOperation({ summary: 'Actualiza un tipo de usuario por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del tipo de usuario a actualizar',
    example: 1,
  })
  @ApiBody({
    type: CreateTipoUsuarioDto,
    description: 'Datos para actualizar el tipo de usuario',
    required: true,
  })
  @ApiOkResponse({
    description: 'Tipo de usuario actualizado exitosamente',
    type: CreateTipoUsuarioResponseDto,
  })
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
  @ApiOperation({ summary: 'Elimina un tipo de usuario por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del tipo de usuario a eliminar',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Tipo de usuario eliminado exitosamente',
    type: DeleteTipoUsuarioResponseDto,
  })
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
