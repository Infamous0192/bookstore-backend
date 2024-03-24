import { ApiProperty } from '@nestjs/swagger';

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
}

export class Authorized {
  token: string;
  creds: Creds;
}
