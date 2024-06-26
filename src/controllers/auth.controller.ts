import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegisterDTO } from 'src/dto';
import { AuthGuard } from 'src/guards';
import { AuthService, UserService } from 'src/services';
import {
  ErrorResponse,
  GeneralResponse,
  Authorized,
  User,
  Creds,
} from 'src/types';
import { ApiGeneralResponse } from 'src/utils/decorators';

@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiGeneralResponse(User, HttpStatus.OK)
  @ApiBadRequestResponse({ type: ErrorResponse })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async validate(@Request() request): Promise<Creds> {
    const user = await this.userService.findOne({ id: request.user.id });

    return {
      id: user.id,
      books: user.books,
      name: user.name,
      point: user.point,
      username: user.username,
      role: user.role,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiGeneralResponse(Authorized, HttpStatus.OK)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async login(@Body() data: LoginDTO): Promise<GeneralResponse<Authorized>> {
    const auth = await this.authService.login(data);

    return {
      message: 'Login success',
      result: auth,
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiGeneralResponse(Authorized, HttpStatus.OK)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async register(
    @Body() data: RegisterDTO,
  ): Promise<GeneralResponse<Authorized>> {
    const auth = await this.authService.register(data);

    return {
      message: 'Register success',
      result: auth,
    };
  }
}
