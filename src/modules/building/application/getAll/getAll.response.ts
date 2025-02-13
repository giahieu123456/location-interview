import { ApiProperty } from '@nestjs/swagger';
import { BuildingResponse } from '../getById/getBuilding.response';

export class GetBuildingQueryResponse {
  @ApiProperty({
    description: 'take',
    example: 10,
  })
  skip?: number;

  @ApiProperty({
    description: 'total',
    example: 10,
  })
  total?: number;

  @ApiProperty({
    description: 'skip',
    example: 0,
  })
  take?: number;
  @ApiProperty({
    description: 'List of Location',
    isArray: true,
    example: [],
  })
  data!: BuildingResponse[];
}
