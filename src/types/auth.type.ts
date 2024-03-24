import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.type';

export class Creds {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  point: number;

  @ApiProperty()
  books: Book[];
}

export class Authorized {
  token: string;
  creds: Creds;
}
