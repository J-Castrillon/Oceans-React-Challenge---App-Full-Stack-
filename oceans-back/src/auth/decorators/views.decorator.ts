import { SetMetadata } from '@nestjs/common';
import { Views } from '../enums/views.enum';

export const VIEWS_KEY = 'VIEWS';
export const View = (...views: Array<keyof typeof Views>) =>
  SetMetadata(VIEWS_KEY, views);
