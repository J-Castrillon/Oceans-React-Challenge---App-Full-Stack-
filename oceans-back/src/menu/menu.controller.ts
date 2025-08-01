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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Views } from 'src/auth/enums/views.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  ResponseDeleteResultsMenuDto,
  ResponsesCreateMenuDto,
  ResponsesResultsMenuDto,
} from './dto/responses-menu.dto';

@Controller('menu')
@Auth(Views.DASHBOARD)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo producto',
  })
  @ApiCreatedResponse({
    description: 'El producto ha sido creado correctamente',
    type: ResponsesCreateMenuDto,
  })
  async create(@Body() createMenuDto: CreateMenuDto) {
    try {
      return await this.menuService.create(createMenuDto);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Create Menu Error',
        error: error.message,
      };
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los productos',
  })
  @ApiOkResponse({
    description: 'Lista de productos obtenida correctamente',
    type: ResponsesResultsMenuDto,
  })
  @Public()
  async findAll() {
    try {
      return await this.menuService.findAll();
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Find All Menu Error',
        error: error.message,
      };
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un productos por su ID',
  })
  @ApiOkResponse({
    description: 'Producto obtenido correctamente',
    type: ResponsesResultsMenuDto,
  })
  @Public()
  async findOne(@Param('id') id: string) {
    try {
      return await this.menuService.findOne(+id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Find One Menu Error',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un producto por su ID',
  })
  @ApiOkResponse({
    description: 'Producto actualizado correctamente',
    type: ResponsesCreateMenuDto,
  })
  @ApiBody({
    description: 'Datos del producto a actualizar',
    type: CreateMenuDto,
  })
  @ApiParam({ name: 'id', description: 'ID del producto a actualizar' })
  @Public()
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    try {
      return await this.menuService.update(+id, updateMenuDto);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Update Menu Error',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un producto por su ID',
  })
  @ApiParam({ name: 'id', description: 'ID del producto a eliminar' })
  @ApiOkResponse({
    description: 'Producto eliminado correctamente',
    type: ResponseDeleteResultsMenuDto,
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.menuService.remove(+id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Delete Menu Error',
        error: error.message,
      };
    }
  }
}
