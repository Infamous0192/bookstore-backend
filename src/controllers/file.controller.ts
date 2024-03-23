import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileQuery, FileUploadDTO } from 'src/dto';
import { AuthGuard } from 'src/guards';
import { FileService } from 'src/services';
import {
  ErrorResponse,
  GeneralResponse,
  PaginatedResult,
  File,
} from 'src/types';
import { ApiGeneralResponse, ApiPaginatedResponse } from 'src/utils/decorators';

@ApiTags('Files')
@ApiBearerAuth()
@Controller({
  path: 'files',
})
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO })
  @ApiGeneralResponse(File, HttpStatus.CREATED)
  @ApiBadRequestResponse({ type: ErrorResponse })
  @UseGuards(AuthGuard)
  async create(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<GeneralResponse<File>> {
    const result = await this.fileService.upload(file);

    return {
      message: 'File created successfully',
      result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(File)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async findAll(@Query() query: FileQuery): Promise<PaginatedResult<File>> {
    return await this.fileService.findMany(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiGeneralResponse(File)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async findOne(@Param('id') id: File['id']): Promise<File> {
    return await this.fileService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiGeneralResponse(File)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async remove(@Param('id') id: File['id']): Promise<GeneralResponse> {
    await this.fileService.delete(id);

    return {
      message: 'File deleted successfully',
    };
  }
}
