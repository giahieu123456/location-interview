import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetBuildingRequestQuery } from '../getAll/getAll.request-query';
import { GetBuildingsQuery } from './getById.query';
import { GetLocationByIdRequestParam } from './getById.request-param';
import { BuildingResponse } from './getBuilding.response';

@ApiTags('Building')
@ApiBearerAuth()
@Controller({
  path: 'buildings',
  version: '1',
})
export class GetLocationByIdEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: 'get location by id' })
  @Get(':id')
  @ApiOkResponse({
    type: GetBuildingRequestQuery,
    description: 'Successfully retrieved location.',
  })
  get(@Param() { id }: GetLocationByIdRequestParam): Promise<BuildingResponse> {
    return this.queryBus.execute<GetBuildingsQuery, BuildingResponse>(
      new GetBuildingsQuery(id),
    );
  }
}
