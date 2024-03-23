import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GeneralResponse<T = undefined> {
  @ApiProperty()
  message: string;

  result?: T;
}

export class ErrorResponse {
  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  errors?: { [key: string]: string };
}
