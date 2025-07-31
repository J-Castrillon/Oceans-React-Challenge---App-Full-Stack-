import { PartialType } from '@nestjs/mapped-types';
import { CreateResourcesManageDto } from './create-resources-manage.dto';

export class UpdateResourcesManageDto extends PartialType(CreateResourcesManageDto) {}
