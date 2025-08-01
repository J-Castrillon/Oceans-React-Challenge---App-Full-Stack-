import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersManageService } from 'src/users-typeUsers/users-manage/users-manage.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersManageService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const { user } = await this.userService.findOne(+loginDto.document);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      role: user.role.roleId,
      // accessLevel: user.role.accesLevel,
      document: user.document,
    };

    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }
}
