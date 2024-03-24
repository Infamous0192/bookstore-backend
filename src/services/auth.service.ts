import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { UserRepository } from 'src/repositories';
import { Authorized, Creds } from 'src/types';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDTO } from 'src/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(data: LoginDTO): Promise<Authorized> {
    const user = await this.userRepository.findOne({ username: data.username });
    if (!user) {
      throw new HttpException(
        {
          message: 'Invalid Payload',
          errors: {
            username: 'User not found',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new HttpException(
        {
          message: 'Invalid Payload',
          errors: {
            password: 'Password incorrect',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const creds: Creds = {
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.username,
      point: user.point,
      books: user.books,
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
    if (
      (await this.userRepository.findOne({ username: data.username })) != null
    ) {
      throw new HttpException(
        {
          message: 'Invalid Payload',
          errors: {
            username: 'User already exist',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const salt = await bcrypt.genSalt();
    const user = await this.userRepository.create({
      name: data.name,
      username: data.username,
      password: await bcrypt.hash(data.password, salt),
      point: 100,
      role: 'client',
      books: [],
    });

    const creds: Creds = {
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.username,
      point: user.point,
      books: user.books,
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
