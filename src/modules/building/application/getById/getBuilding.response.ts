import { ApiProperty } from '@nestjs/swagger';
import { LocationResponse } from '../../../location/application/getLocationById/getlocation.response';
import { Location } from '../../../../entities/location.entity';

export class BuildingResponse {
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
    description: 'locations',
    example: [],
  })
  locations!: Location[];
}
