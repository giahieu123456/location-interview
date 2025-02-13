import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../../../entities/location.entity';

export class LocationResponse implements Location {
  @ApiProperty({
    description: 'Location number',
    example: 'A-01',
  })
  locationNumber!: string;

  @ApiProperty({
    description: 'area value',
    example: '100.00',
  })
  area!: number;

  @ApiProperty({
    description: 'location id',
    example: 1,
  })
  parentId?: number;

  @ApiProperty({
    description: 'location id',
    example: 2,
  })
  id!: number;

  @ApiProperty({
    description: 'name of building',
    example: 'building A',
  })
  name!: string;

  @ApiProperty({
    description: 'name of building',
    example: 'building A',
  })
  children!: Location[];
}
