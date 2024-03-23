import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Book } from './book.type';

export class User {
  @ApiProperty({ type: Number })
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  point: number;

  @ApiProperty()
  books: Book[];

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
