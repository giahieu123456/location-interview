import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class GetLocationByIdRequestParam {
  @ApiProperty({
    description: 'location Id',
    example: '',
  })
  @IsNotEmpty()
  @IsNumberString()
  id!: string;
}
