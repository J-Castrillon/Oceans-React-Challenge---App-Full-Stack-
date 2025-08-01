import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersManageService } from './users-manage.service';
import { CreateUsersManageDto } from './dto/create-users-manage.dto';
import { UpdateUsersManageDto } from './dto/update-users-manage.dto';
import { Public } from 'src/auth/decorators/public.decorator';
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
  ResponseAllUsersDto,
  ResponseDeleteUserDto,
  ResponseOneUserDto,
  ResponseUpdateUserDto,
  ResponseUserDto,
} from './dto/responses-users.dto';

@Controller('users-manage')
@Auth(Views.DASHBOARD)
export class UsersManageController {
  constructor(private readonly usersManageService: UsersManageService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nuevo usuario',
  })
  @ApiCreatedResponse({
    description: 'Usuario creado exitosamente',
    type: ResponseUserDto,
  })
  async create(@Body() createUsersManageDto: CreateUsersManageDto) {
    try {
      return await this.usersManageService.create(createUsersManageDto);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Create User Error',
        error: error.message,
      };
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
  })
  @ApiOkResponse({
    description: 'Usuarios obtenidos exitosamente',
    type: ResponseAllUsersDto,
  })
  async findAll() {
    try {
      return await this.usersManageService.findAll();
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Find All Users Error',
        error: error.message,
      };
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener usuario por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a obtener',
    example: 1,
    required: true,
  })
  @ApiOkResponse({
    description: 'Usuario obtenido exitosamente',
    type: ResponseOneUserDto,
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersManageService.findOne(+id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Find User Error',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar usuario',
  })
  @ApiCreatedResponse({
    description: 'Usuario editado exitosamente',
    type: ResponseUpdateUserDto,
  })
  @ApiBody({
    type: CreateUsersManageDto,
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a editar',
    example: 1,
    required: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUsersManageDto: UpdateUsersManageDto,
  ) {
    try {
      return await this.usersManageService.update(+id, updateUsersManageDto);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Update User Error',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar usuario por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a eliminar',
    example: 1,
    required: true,
  })
  @ApiOkResponse({
    description: 'Usuario eliminado exitosamente',
    type: ResponseDeleteUserDto,
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.usersManageService.remove(+id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Delete User Error',
        error: error.message,
      };
    }
  }
}
