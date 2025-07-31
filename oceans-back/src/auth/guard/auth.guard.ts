import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwtConstants';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization
      ? request.headers.authorization
      : undefined;

    if (!token) throw new UnauthorizedException();

    const secret = jwtConstants(this.configService).SECRET;

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
