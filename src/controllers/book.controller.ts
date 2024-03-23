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
import { BookDTO, BookQuery } from 'src/dto';
import { AuthGuard } from 'src/guards';
import { BookService } from 'src/services';
import {
  ErrorResponse,
  GeneralResponse,
  PaginatedResult,
  Book,
} from 'src/types';
import { ApiGeneralResponse, ApiPaginatedResponse } from 'src/utils/decorators';

@ApiTags('Books')
@ApiBearerAuth()
@Controller({
  path: 'books',
})
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiGeneralResponse(Book, HttpStatus.CREATED)
  @ApiBadRequestResponse({ type: ErrorResponse })
  @UseGuards(AuthGuard)
  async create(@Body() data: BookDTO): Promise<GeneralResponse<Book>> {
    const book = await this.bookService.create(data);

    return {
      message: 'Book created successfully',
      result: book,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Book)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async findAll(@Query() query: BookQuery): Promise<PaginatedResult<Book>> {
    return await this.bookService.findMany(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiGeneralResponse(Book)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async findOne(@Param('id') id: Book['id']): Promise<Book> {
    return await this.bookService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiGeneralResponse(Book)
  @ApiBadRequestResponse({ type: ErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: Book['id'],
    @Body() data: BookDTO,
  ): Promise<GeneralResponse<Book>> {
    const book = await this.bookService.update(id, data);

    return {
      message: 'Book updated successfully',
      result: book,
    };
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiGeneralResponse(Book)
  @ApiBadRequestResponse({ type: ErrorResponse })
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: Book['id']): Promise<GeneralResponse> {
    await this.bookService.delete(id);

    return {
      message: 'Book deleted successfully',
    };
  }
}
