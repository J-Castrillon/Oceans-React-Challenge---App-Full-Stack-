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

@Controller('users-manage')
@Auth(Views.DASHBOARD)
export class UsersManageController {
  constructor(private readonly usersManageService: UsersManageService) {}

  @Post()
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
  @Public()
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
  @Public()
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
