import { ApiProperty } from '@nestjs/swagger';
import { File } from './file.type';
import { Tag } from './tag.type';

export class Book {
  @ApiProperty({ type: Number })
  id?: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  thumbnail: File;

  @ApiProperty()
  tags: Tag[];

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
