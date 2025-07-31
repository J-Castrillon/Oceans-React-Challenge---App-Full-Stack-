import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserInterface } from 'src/types/usersTypes';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Views } from '../enums/views.enum';
import { VIEWS_KEY } from '../decorators/views.decorator';
import { lastValueFrom } from 'rxjs';
import { TipoUsuariosService } from 'src/users-typeUsers/tipo-usuarios/tipo-usuario.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => TipoUsuariosService))
    private readonly typeUsersService: TipoUsuariosService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const views = this.reflector.getAllAndOverride<Views[]>(VIEWS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!views) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();
    const { unicRole } = await this.typeUsersService.findOne(+user.role);

    if (!unicRole) return false;

    const isAuth = views.some((view) =>
      unicRole.accesLevel.some(
        (role) => view === role && +user.role === unicRole.roleId,
      ),
    );

    return isAuth;
  }
}
