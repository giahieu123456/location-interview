import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateLocationRequestBody {
  @ApiProperty({
    description: 'parent id',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  parentId?: number;

  @ApiProperty({
    description: 'name of location',
    example: 'Root location',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Name is too long' })
  name!: string;

  @ApiProperty({
    description: 'location number',
    example: 'lobby-b',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { message: 'location number is too long' })
  locationNumber!: string;

  @ApiProperty({
    description: 'Area value',
    example: '100.123',
  })
  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ value }) => value.toString())
  area!: string;
}
