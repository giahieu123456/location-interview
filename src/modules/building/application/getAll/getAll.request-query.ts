import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetBuildingRequestQuery {
  @ApiPropertyOptional({
    description: 'take',
    example: 10,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  take!: number;

  @ApiPropertyOptional({
    description: 'skip',
    example: 0,
  })
  @IsOptional()
  @IsOptional()
  @Transform(({ value }) => +value)
  skip!: number;

  @ApiPropertyOptional({
    description: 'Search by keyword',
    example: 'Test',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
