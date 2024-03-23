import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FileUploadDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}

export class FileQuery {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  orderBy?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  order?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  keyword?: string;
}
