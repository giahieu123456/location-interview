import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class DeleteBuildingRequestParam {
  @ApiProperty({
    description: 'building id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  id!: string;
}
