import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegisterDTO } from 'src/dto';
import { AuthService } from 'src/services';
import { ErrorResponse, GeneralResponse, Authorized } from 'src/types';
import { ApiGeneralResponse } from 'src/utils/decorators';

@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
