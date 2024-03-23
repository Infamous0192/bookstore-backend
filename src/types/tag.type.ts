import { ApiProperty } from '@nestjs/swagger';

export class Tag {
  @ApiProperty({ type: Number })
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
