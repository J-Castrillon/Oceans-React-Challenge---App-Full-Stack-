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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateStateOrderDto } from './dto/update-order.dto';
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
  ResponseAllOrdersDto,
  ResponseCreateOrderDto,
  ResponseDeleteOrderDto,
  ResponseUnicOrderDto,
  ResponseUpdateOrderDto,
} from './dto/response-order.dto';

@Controller('orders')
@Auth(Views.PROCESS, Views.DASHBOARD)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva orden',
    description: 'Crea una nueva orden con los detalles proporcionados.',
  })
  @ApiCreatedResponse({
    description: 'Orden creada exitosamente.',
    type: ResponseCreateOrderDto,
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.ordersService.create(createOrderDto);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Create Order Error',
        error: error.message,
      };
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las órdenes',
    description: 'Recupera una lista de todas las órdenes existentes.',
  })
  @ApiOkResponse({
    description: 'Lista de órdenes recuperada exitosamente.',
    type: ResponseAllOrdersDto,
  })
  async findAll() {
    try {
      return await this.ordersService.findAll();
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Find All Orders Error',
        error: error.message,
      };
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una orden por ID',
    description:
      'Recupera los detalles de una orden específica utilizando su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden a recuperar',
    type: Number,
  })
  @ApiOkResponse({
    description: 'Orden recuperada exitosamente.',
    type: ResponseUnicOrderDto,
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.ordersService.findOne(+id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Find One Order Error',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una orden por ID',
    description:
      'Actualiza los detalles de una orden específica utilizando su ID.',
  })
  @ApiBody({
    description: 'Detalles de la orden a actualizar',
    type: CreateOrderDto,
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden a actualizar',
    type: Number,
  })
  @ApiOkResponse({
    description: 'Orden actualizada exitosamente.',
    type: ResponseUpdateOrderDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      return await this.ordersService.update(+id, updateOrderDto);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Update Order Error',
        error: error.message,
      };
    }
  }

  @Patch('/status/:id')
  @ApiOperation({
    summary: 'Actualizar el estado de una orden por ID',
    description:
      'Actualiza el estado de una orden específica utilizando su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden a actualizar',
    type: Number,
  })
  @ApiBody({
    description: 'Nuevo estado de la orden',
    type: UpdateStateOrderDto,
  })
  @ApiOkResponse({
    description: 'Estado de la orden actualizado exitosamente.',
    type: ResponseUpdateOrderDto,
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStateOrderDto: UpdateStateOrderDto,
  ) {
    try {
      if (!updateStateOrderDto.status) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Status is required',
        };
      }

      return await this.ordersService.updateStatus(
        +id,
        updateStateOrderDto.status,
      );
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Update Status Order Error',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una orden por ID',
    description: 'Elimina una orden específica utilizando su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden a eliminar',
    type: Number,
  })
  @ApiOkResponse({
    description: 'Orden eliminada exitosamente.',
    type: ResponseDeleteOrderDto,
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.ordersService.remove(+id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Delete Order Error',
        error: error.message,
      };
    }
  }
}
