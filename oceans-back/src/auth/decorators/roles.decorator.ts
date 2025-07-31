import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'ROLES';
export const Roles = (...roles: Array<keyof typeof Role>) =>
  SetMetadata(ROLES_KEY, roles);
