import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    try {
      const newMenu = await this.menuRepository.save(createMenuDto);

      if (!newMenu) throw new BadRequestException('Error creating menu');

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Menu created successfully',
        newMenu,
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error creating menu');
    }
  }

  async findAll() {
    try {
      const menus = await this.menuRepository.find();

      if (!menus) throw new BadRequestException('Menus not found');

      return {
        statusCode: HttpStatus.OK,
        menus,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error fetching menus');
    }
  }

  async findOne(id: number) {
    try {
      const menu = await this.menuRepository.findOne({
        where: { menuId: id },
      });

      if (!menu)
        throw new BadRequestException(HttpStatus.NOT_FOUND, 'Menu not found');

      return {
        statusCode: HttpStatus.OK,
        menu,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error fetching menu');
    }
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    try {
      const menu = await this.menuRepository.findOne({
        where: { menuId: id },
      });

      if (!menu)
        throw new BadRequestException(HttpStatus.NOT_FOUND, 'Menu not found');

      Object.assign(menu, updateMenuDto);

      const updatedMenu = await this.menuRepository.save(menu);

      return {
        statusCode: HttpStatus.OK,
        updatedMenu,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error updating menu');
    }
  }

  async remove(id: number) {
    try {
      const menu = await this.menuRepository.findOne({
        where: { menuId: +id },
      });

      if (!menu)
        throw new BadRequestException(HttpStatus.NOT_FOUND, 'Menu not found');

      await this.menuRepository.delete(+id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Menu deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error deleting menu');
    }
  }
}
