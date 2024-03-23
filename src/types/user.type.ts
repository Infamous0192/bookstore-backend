import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

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
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
