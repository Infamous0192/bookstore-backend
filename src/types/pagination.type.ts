import { ApiProperty } from '@nestjs/swagger';

export class Metadata {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  hasNext: boolean;

  @ApiProperty()
  hasPrev: boolean;
}

export class PaginatedResult<T> {
  @ApiProperty({ description: 'Metadata about the pagination' })
  metadata: Metadata;

  result: T[];
}
