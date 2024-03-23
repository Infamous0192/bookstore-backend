import { ApiProperty } from '@nestjs/swagger';

export class File {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  originalname: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
