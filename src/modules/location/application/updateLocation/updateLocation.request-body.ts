import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateLocationRequestBody {
  @ApiProperty({
    description: 'name of location',
    example: 'Root location',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Name is too long' })
  name?: string;

  @ApiProperty({
    description: 'location number',
    example: 'lobby-b',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'location number is too long' })
  locationNumber?: string;

  @ApiProperty({
    description: 'Area value',
    example: '100.123',
  })
  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => value.toString())
  area?: string;
}
