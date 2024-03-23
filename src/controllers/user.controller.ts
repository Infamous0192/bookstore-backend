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
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserDTO, UserQuery } from 'src/dto';
import { AuthGuard } from 'src/guards';
import { UserService } from 'src/services';
import {
  Book,
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
  @ApiResponse({ type: User })
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

  @Get(':userId/book')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
  })
  @ApiResponse({ type: [Book] })
  @ApiBadRequestResponse({ type: ErrorResponse })
  async getBook(@Param('userId') userId: User['id']): Promise<Book[]> {
    const books = await this.userService.getBook(userId);

    return books;
  }

  @Put(':userId/book/:bookId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'bookId',
    type: String,
    required: true,
  })
  @ApiGeneralResponse()
  @ApiBadRequestResponse({ type: ErrorResponse })
  async addBook(
    @Param('userId') userId: User['id'],
    @Param('bookId') bookId: Book['id'],
  ): Promise<GeneralResponse<User>> {
    await this.userService.addBook(userId, bookId);

    return {
      message: 'Book added to collection',
    };
  }

  @Delete(':userId/book/:bookId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'bookId',
    type: String,
    required: true,
  })
  @ApiGeneralResponse()
  @ApiBadRequestResponse({ type: ErrorResponse })
  async removeBook(
    @Param('userId') userId: User['id'],
    @Param('bookId') bookId: Book['id'],
  ): Promise<GeneralResponse<User>> {
    await this.userService.removeBook(userId, bookId);

    return {
      message: 'Book removed from collection',
    };
  }
}
