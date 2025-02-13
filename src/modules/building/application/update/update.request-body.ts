import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateBuildingRequestBody {
  @ApiProperty({
    description: 'name of building',
    example: 'Root location',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Name is too long' })
  name?: string;
}
