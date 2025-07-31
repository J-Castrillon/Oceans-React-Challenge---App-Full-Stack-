import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResourcesManageDto } from './dto/create-resources-manage.dto';
import { UpdateResourcesManageDto } from './dto/update-resources-manage.dto';
import * as path from 'path';
import * as fs from 'fs';
import { ResourcesManage } from './entities/resources-manage.entity';
import { Repository, Timestamp } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResourcesManageService {
  constructor(
    @InjectRepository(ResourcesManage)
    private readonly resourceRepository: Repository<ResourcesManage>,
  ) {}

  async create(
    createResourcesManageDto: CreateResourcesManageDto,
    savedFilesMetadata: {
      resourceName: string;
      extension: string;
      size: number;
    }[],
  ) {
    try {
      for (const file of savedFilesMetadata) {
        const newFile = {
          ...createResourcesManageDto,
          resourceName: file.resourceName,
          extension: file.extension,
          size: +file.size!,
          status: createResourcesManageDto.status || 'active',
        };

        const savedFile = await this.resourceRepository.save(newFile);

        if (!savedFile) throw new BadRequestException('Error saving the file');

        const filePath = path.join(
          path.join(process.cwd(), 'Uploads'),
          `${file.resourceName}.${file.extension}`,
        );

        if (fs.existsSync(filePath)) {
          const fileUrl = `${process.env.API_URL}:${process.env.PORT}/static/${file.resourceName}.${file.extension}`;
          const unicResource = {
            ...savedFile,
            path: fileUrl,
          };
          return unicResource;
        } else {
          console.log(`File not found: ${filePath}`);

          const defaultUrl = `${process.env.API_URL}:${process.env.PORT}/static/default.png`;
          const unicResource = {
            ...savedFile,
            path: defaultUrl,
          };
          return unicResource;
        }
      }
    } catch (error) {
      console.error(
        '🔥 Error completo:',
        JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
      );
      throw error instanceof Error
        ? error
        : new InternalServerErrorException('Error processing request');
    }
  }

  async findAll() {
    try {
      const resources = await this.resourceRepository.find({
        order: { resourceId: 'DESC' },
      });

      if (!resources || resources.length === 0) {
        throw new BadRequestException('No resources found');
      }

      const fileUrls = [] as {
        path: string;
        resourceId: number;
        resourceName: string;
        description: string;
        extension: string;
        size: number;
        lastModified: Timestamp;
        status: string;
        created_at: string;
      }[];

      for (const resource of resources) {
        const filePath = path.join(
          path.join(process.cwd(), 'Uploads'),
          `${resource.resourceName}.${resource.extension}`,
        );

        if (fs.existsSync(filePath)) {
          const fileUrl = `${process.env.API_URL}:${process.env.PORT}/static/${resource.resourceName}.${resource.extension}`;
          const unicResource = {
            ...resource,
            path: fileUrl,
          };
          fileUrls.push(unicResource);
        } else {
          console.log(`File not found: ${filePath}`);

          const defaultUrl = `${process.env.API_URL}:${process.env.PORT}/static/default.jpg`;
          const unicResource = {
            ...resource,
            path: defaultUrl,
          };

          fileUrls.push(unicResource);
        }
      }

      return {
        statusCode: HttpStatus.OK,
        files: fileUrls,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error fetching resources');
    }
  }

  async findOne(id: number) {
    try {
      const resource = await this.resourceRepository.findOne({
        where: { resourceId: id },
      });

      if (!resource) throw new NotFoundException('Resource not found');

      return {
        statusCode: HttpStatus.OK,
        resource,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error fetching resource');
    }
  }

  async viewOne(id: number) {
    try {
      const resource = await this.resourceRepository.findOne({
        where: { resourceId: id },
      });

      if (resource) {
        const filePath = path.join(
          path.join(process.cwd(), 'Uploads'),
          `${resource.resourceName}.${resource.extension}`,
        );

        if (fs.existsSync(filePath)) {
          const fileUrl = `${process.env.API_URL}:${process.env.PORT}/static/${resource.resourceName}.${resource.extension}`;

          const unicResource = {
            ...resource,
            path: fileUrl,
          };

          return {
            status: HttpStatus.OK,
            unicResource,
          };
        } else {
          console.log(`File not found: ${filePath}`);

          const defaultUrl = `${process.env.API_URL}:${process.env.PORT}/static/default.jpg`;
          const unicResource = {
            ...resource,
            path: defaultUrl,
          };

          return {
            status: HttpStatus.NOT_FOUND,
            unicResource,
          };
        }
      } else {
        console.log(`File not found: ${id}`);
      }
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new InternalServerErrorException('Error fetching resource');
    }
  }

  async update(id: number, updateResourcesManageDto: UpdateResourcesManageDto) {
    try {
      const resource = await this.resourceRepository.findOne({
        where: { resourceId: id },
      });

      if (!resource) {
        throw new BadRequestException(
          HttpStatus.NOT_FOUND,
          'Resource not found',
        );
      }

      Object.assign(resource, updateResourcesManageDto);
      const updatedResource = await this.resourceRepository.save(resource);

      return updatedResource;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new InternalServerErrorException('Error updating resource');
    }
  }

  async remove(id: number) {
    try {
      const resource = await this.resourceRepository.findOne({
        where: { resourceId: id },
      });

      if (!resource)
        throw new BadRequestException(
          HttpStatus.NOT_FOUND,
          'Resource not found',
        );

      const sharedResources = await this.resourceRepository.count({
        where: {
          resourceName: resource.resourceName,
          extension: resource.extension,
        },
      });

      if (sharedResources === 1) {
        await this.resourceRepository.delete(id);
        const filePath = path.join(
          path.join(process.cwd(), 'Uploads'),
          `${resource.resourceName}.${resource.extension}`,
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        return {
          statusCode: HttpStatus.OK,
          message: 'Resource deleted successfully',
          resource,
        };
      }

      await this.resourceRepository.delete(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Resource deleted successfully',
        resource,
      };
    } catch (error) {
      if (error instanceof Error) throw error;

      throw new InternalServerErrorException('Error deleting resource');
    }
  }

  async countResourcesByFileName(fileName: string) {
    const resourceName = fileName.substring(0, fileName.lastIndexOf('.'));

    const extension = fileName?.split('.')?.pop()?.toLowerCase();

    return this.resourceRepository.count({
      where: {
        resourceName: resourceName,
        extension: extension,
      },
    });
  }
}
