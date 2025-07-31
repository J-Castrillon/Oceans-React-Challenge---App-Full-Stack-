import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUsersManageDto } from './dto/create-users-manage.dto';
import { UpdateUsersManageDto } from './dto/update-users-manage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersManage } from './entities/users-manage.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersManageService {
  constructor(
    @InjectRepository(UsersManage)
    private readonly usersManageRepository: Repository<UsersManage>,
  ) {}

  async create(createUsersManageDto: CreateUsersManageDto) {
    try {
      const newUser = await this.usersManageRepository.save({
        ...createUsersManageDto,
        password: await bcrypt.hash(createUsersManageDto.password, 10),
      });

      if (!newUser) throw new BadRequestException('Error creating user');

      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        newUser,
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll() {
    try {
      const users = await this.usersManageRepository.find();

      if (!users) throw new BadRequestException('Error fetching users');

      return {
        statusCode: HttpStatus.OK,
        message: 'Users fetched successfully',
        users,
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersManageRepository.findOne({
        where: { document: id },
      });

      if (!user) throw new BadRequestException('User not found');

      return {
        statusCode: HttpStatus.OK,
        message: 'User fetched successfully',
        user,
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error fetching user');
    }
  }

  async update(id: number, updateUsersManageDto: UpdateUsersManageDto) {
    try {
      const user = await this.usersManageRepository.findOne({
        where: { document: id },
      });

      if (!user) throw new BadRequestException('User not found');

      Object.assign(user, updateUsersManageDto);

      await this.usersManageRepository.save(user);

      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error updating user');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.usersManageRepository.findOne({
        where: { document: id },
      });

      if (!user) throw new BadRequestException('User not found');

      await this.usersManageRepository.delete(user.document);

      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error deleting user');
    }
  }
}
