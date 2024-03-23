import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserDTO, UserQuery } from 'src/dto';
import { AuthGuard } from 'src/guards';
import { UserService } from 'src/services';
import {
  ErrorResponse,
  GeneralResponse,
  PaginatedResult,
  User,
} from 'src/types';
import { ApiGeneralResponse, ApiPaginatedResponse } from 'src/utils/decorators';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({
  path: 'users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiGeneralResponse(User, HttpStatus.CREATED)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async create(@Body() data: UserDTO): Promise<GeneralResponse<User>> {
    const user = await this.userService.create(data);

    return {
      message: 'User created successfully',
      result: user,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(User)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async findAll(@Query() query: UserQuery): Promise<PaginatedResult<User>> {
    return await this.userService.findMany(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiGeneralResponse(User)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async findOne(@Param('id') id: User['id']): Promise<User> {
    return await this.userService.findOne({ id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiGeneralResponse(User)
  @ApiBadRequestResponse({ type: ErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  async update(
    @Param('id') id: User['id'],
    @Body() data: UserDTO,
  ): Promise<GeneralResponse<User>> {
    const user = await this.userService.update(id, data);

    return {
      message: 'User updated successfully',
      result: user,
    };
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiGeneralResponse(User)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async remove(@Param('id') id: User['id']): Promise<GeneralResponse> {
    await this.userService.delete(id);

    return {
      message: 'User deleted successfully',
    };
  }
}
