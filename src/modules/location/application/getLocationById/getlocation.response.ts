import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../../../entities/location.entity';
import { Building } from '../../../../entities/building.entity';

export class LocationResponse {
  @ApiProperty({
    description: 'building id',
    example: '1',
  })
  buildingId!: number;

  @ApiProperty({
    description: 'parent',
    example: {},
  })
  parent!: LocationResponse | null;

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
  children!: LocationResponse[];
}
