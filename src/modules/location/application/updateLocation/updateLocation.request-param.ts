import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateLocationRequestParam {
  @ApiProperty({
    description: 'location Id',
    example: '',
  })
  @IsNotEmpty()
  @IsNumberString()
  id!: string;
}
