import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  InternalServerErrorException,
} from '@nestjs/common';
import { ResourcesManageService } from './resources-manage.service';
import { CreateResourcesManageDto } from './dto/create-resources-manage.dto';
import { UpdateResourcesManageDto } from './dto/update-resources-manage.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  ResourceUploadResponseDto,
  ResponseAllResourcesDto,
  ResponseDeleteResourceDto,
  ResponseOneResourceDto,
} from './dto/response-resources.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Views } from 'src/auth/enums/views.enum';

@Controller('resources-manage')
@Auth(Views.DASHBOARD)
export class ResourcesManageController {
  constructor(
    private readonly resourcesManageService: ResourcesManageService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Sube varios archivos con campos adicionales' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        Uploads: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        description: {
          type: 'string',
          example: 'Este es el recurso 1',
        },
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'archived'],
          example: 'active',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Resource created successfully',
    type: ResourceUploadResponseDto,
  })
  @UseInterceptors(
    FilesInterceptor('Uploads', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(process.cwd(), 'Uploads');
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const extensions = ['jpg', 'png', 'jpeg', 'svg'];
          const fileExtension = file?.originalname
            ?.split('.')
            ?.pop()
            ?.toLowerCase();

          if (fileExtension && !extensions.includes(fileExtension)) {
            return cb(
              new BadRequestException(
                fileExtension + ' is not a valid file type.',
              ),
              '',
            );
          }

          cb(null, file.originalname);
        },
      }),
    }),
  )
  async create(
    @Body() createResourcesManageDto: CreateResourcesManageDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const savedFilesMetadata = files.map((file) => {
        const fileName = file.originalname.substring(
          0,
          file.originalname.lastIndexOf('.'),
        );
        const extension = file?.originalname?.split('.')?.pop()?.toLowerCase();
        return {
          resourceName: fileName!,
          extension: extension!,
          size: +file.size!,
        };
      });

      const createResourceDtoArray = [createResourcesManageDto];

      const response = await this.resourcesManageService.create(
        createResourceDtoArray[0],
        savedFilesMetadata,
      );

      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Create Resource Error',
        error: error.message,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Ver todos los recursos' })
  @ApiOkResponse({
    description: 'List of all resources',
    type: ResponseAllResourcesDto,
  })
  @Public()
  async findAll() {
    try {
      return await this.resourcesManageService.findAll();
    } catch (error) {
      return {
        statusCode: 500,
        message: 'FindAll Resources Error',
        error: error.message,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver un recurso por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del recurso a buscar',
    example: 2,
  })
  @ApiOkResponse({
    description: 'Resource found successfully',
    type: ResponseOneResourceDto,
  })
  @Public()
  async findOne(@Param('id') id: string) {
    try {
      return await this.resourcesManageService.findOne(+id);
    } catch (error) {
      return {
        statusCode: 500,
        message: 'FindOne Resource Error',
        error: error.message,
      };
    }
  }

  @Get('/view/:id')
  @ApiOperation({ summary: 'Ver un recurso con path por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del recurso a buscar',
    example: 2,
  })
  @ApiOkResponse({
    description: 'Resource found successfully',
    type: ResponseOneResourceDto,
  })
  @Public()
  async viewOne(@Param('id') id: string) {
    try {
      const response = await this.resourcesManageService.viewOne(+id);
      return response;
    } catch (error) {
      return {
        statusCode: 500,
        message: 'View Resource Error',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Sube varios archivos con campos adicionales' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        Uploads: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        description: {
          type: 'string',
          example: 'Este es el recurso 1',
        },
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'archived'],
          example: 'active',
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('Uploads', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(process.cwd(), 'Uploads');
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const extensions = ['jpg', 'png', 'jpeg', 'svg'];
          const fileExtension = file?.originalname
            ?.split('.')
            ?.pop()
            ?.toLowerCase();

          if (fileExtension && !extensions.includes(fileExtension)) {
            return cb(
              new BadRequestException(
                fileExtension + ' is not a valid file type.',
              ),
              '',
            );
          }

          cb(null, file.originalname);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateResourcesManageDto: UpdateResourcesManageDto,
    @UploadedFiles() file?: Express.Multer.File,
  ) {
    try {
      const lastResource = await this.resourcesManageService.findOne(+id);

      if (!lastResource || !lastResource.resource) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Resource not found',
        };
      }

      let metadata;
      if (file) {
        const fileName = file.originalname.substring(
          0,
          file.originalname.lastIndexOf('.'),
        );
        const extension = file?.originalname?.split('.')?.pop()?.toLowerCase();
        metadata = {
          ...updateResourcesManageDto,
          resourceName: fileName,
          extension,
          size: +file.size,
        };
      } else {
        metadata = updateResourcesManageDto;
      }

      await this.resourcesManageService.update(+id, metadata);

      if (file) {
        const filePath = path.join(
          process.env.FILE_SERVICE_UBICATION || 'Uploads',
          `${lastResource.resource.resourceName}.${lastResource.resource.extension}`,
        );

        const fileName = `${lastResource.resource.resourceName}.${lastResource.resource.extension}`;

        const resourceCount =
          await this.resourcesManageService.countResourcesByFileName(fileName);

        if (resourceCount === 0) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          } else {
            throw new BadRequestException(`File not found: ${filePath}`);
          }
        }
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Resource updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error updating resource',
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un recurso por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del recurso a eliminar',
    example: 2,
  })
  @ApiOkResponse({
    description: 'Resource deleted successfully',
    type: ResponseDeleteResourceDto,
  })
  async remove(@Param('id') id: string) {
    try {
      const response = await this.resourcesManageService.remove(+id);

      return response;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting resource');
    }
  }
}
