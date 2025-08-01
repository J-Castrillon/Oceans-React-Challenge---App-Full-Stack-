import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigsSiteDto } from './create-configs-site.dto';

export class UpdateConfigsSiteDto extends PartialType(CreateConfigsSiteDto) {}
