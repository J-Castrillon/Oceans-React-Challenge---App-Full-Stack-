import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';
import { Repository } from 'typeorm';
import { TipoUsuario } from './entities/tipo-usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipoUsuariosService {
  constructor(
    @InjectRepository(TipoUsuario)
    private typeUserRepository: Repository<TipoUsuario>,
  ) {}

  async create(createTypeUserDto: CreateTipoUsuarioDto) {
    try {
      const newType = await this.typeUserRepository.save(createTypeUserDto);

      if (!newType) throw new BadRequestException('Error creating user type');

      return {
        statusCode: HttpStatus.CREATED,
        message: 'User type created successfully',
        newType,
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error creating user type');
    }
  }

  async findAll() {
    try {
      const typeUsers = await this.typeUserRepository.find();

      if (!typeUsers) throw new BadRequestException('User types not found');

      return {
        statusCode: HttpStatus.OK,
        typeUsers,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error fetching user types');
    }
  }

  async findOne(roleId: number) {
    try {
      const unicRole = await this.typeUserRepository.findOne({
        where: { roleId },
      });

      if (!unicRole)
        throw new BadRequestException(
          HttpStatus.NOT_FOUND,
          'User type not found',
        );

      return {
        statusCode: HttpStatus.OK,
        unicRole,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error fetching user type');
    }
  }

  async update(roleId: number, updateTypeUserDto: UpdateTipoUsuarioDto) {
    try {
      const role = await this.typeUserRepository.findOne({
        where: { roleId },
      });

      if (!role)
        throw new BadRequestException(
          HttpStatus.NOT_FOUND,
          'User type not found',
        );

      Object.assign(role, updateTypeUserDto);

      const updatedRole = await this.typeUserRepository.save(role);

      return {
        statusCode: HttpStatus.OK,
        updatedRole,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error updating user type');
    }
  }

  async remove(roleId: string) {
    try {
      const role = await this.typeUserRepository.findOne({
        where: { roleId: +roleId },
      });

      if (!role)
        throw new BadRequestException(
          HttpStatus.NOT_FOUND,
          'User type not found',
        );

      await this.typeUserRepository.delete(+roleId);

      return {
        statusCode: HttpStatus.OK,
        message: 'User type deleted successfully',
        'User type deleted': role.roleName,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error deleting user type');
    }
  }
}
