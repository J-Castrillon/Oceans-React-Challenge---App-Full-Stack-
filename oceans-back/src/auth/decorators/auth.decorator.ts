import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { View } from './views.decorator';
import { Views } from '../enums/views.enum';

export const Auth = (...views: Array<keyof typeof Views>) => {
  return applyDecorators(View(...views), UseGuards(AuthGuard, RolesGuard));
};
