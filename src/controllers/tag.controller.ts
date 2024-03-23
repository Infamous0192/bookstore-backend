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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { TagDTO, TagQuery } from 'src/dto';
import { TagService } from 'src/services';
import {
  ErrorResponse,
  GeneralResponse,
  PaginatedResult,
  Tag,
} from 'src/types';
import { ApiGeneralResponse, ApiPaginatedResponse } from 'src/utils/decorators';

@ApiTags('Tags')
@Controller({
  path: 'tags',
})
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiGeneralResponse(Tag, HttpStatus.CREATED)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async create(@Body() data: TagDTO): Promise<GeneralResponse<Tag>> {
    const tag = await this.tagService.create(data);

    return {
      message: 'Tag created successfully',
      result: tag,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Tag)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async findAll(@Query() query: TagQuery): Promise<PaginatedResult<Tag>> {
    return await this.tagService.findMany(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiGeneralResponse(Tag)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async findOne(@Param('id') id: Tag['id']): Promise<Tag> {
    return await this.tagService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiGeneralResponse(Tag)
  @ApiBadRequestResponse({ type: ErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  async update(
    @Param('id') id: Tag['id'],
    @Body() data: TagDTO,
  ): Promise<GeneralResponse<Tag>> {
    const tag = await this.tagService.update(id, data);

    return {
      message: 'Tag updated successfully',
      result: tag,
    };
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiGeneralResponse(Tag)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async remove(@Param('id') id: Tag['id']): Promise<GeneralResponse> {
    await this.tagService.delete(id);

    return {
      message: 'Tag deleted successfully',
    };
  }
}
