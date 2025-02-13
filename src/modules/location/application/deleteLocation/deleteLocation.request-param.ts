import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class SoftDeleteLocationRequestParam {
  @ApiProperty({
    description: 'location id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  id!: string;
}
