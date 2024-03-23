import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { UserService } from 'src/services';
import { Authorized, Creds } from 'src/types';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDTO } from 'src/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(data: LoginDTO): Promise<Authorized> {
    const user = await this.userService.findOne({ username: data.username });
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException();
    }

    const creds: Creds = {
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.username,
    };

    return {
      creds,
      token: await this.jwtService.signAsync(creds, {
        secret: this.configService.getOrThrow('auth.secret', {
          infer: true,
        }),
      }),
    };
  }

  async register(data: RegisterDTO): Promise<Authorized> {
    const user = await this.userService.create({
      name: data.name,
      username: data.username,
      password: data.password,
      point: 100,
      role: 'client',
    });

    const creds: Creds = {
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.username,
    };

    return {
      creds,
      token: await this.jwtService.signAsync(creds, {
        secret: this.configService.getOrThrow('auth.secret', {
          infer: true,
        }),
      }),
    };
  }
}
