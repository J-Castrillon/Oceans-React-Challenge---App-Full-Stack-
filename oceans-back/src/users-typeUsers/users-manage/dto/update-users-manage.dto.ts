import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersManageDto } from './create-users-manage.dto';

export class UpdateUsersManageDto extends PartialType(CreateUsersManageDto) {}
