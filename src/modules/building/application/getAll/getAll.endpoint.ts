import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetBuildingsQuery } from './getAll.query';
import { GetBuildingRequestQuery } from './getAll.request-query';
import { GetBuildingQueryResponse } from './getAll.response';

@ApiTags('Building')
@ApiBearerAuth()
@Controller({
  path: 'buldings',
  version: '1',
})
export class GetLocationEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: 'get building' })
  @Get()
  @ApiOkResponse({
    type: GetBuildingQueryResponse,
    description: 'Successfully retrieved location.',
  })
  get(
    @Query() query: GetBuildingRequestQuery,
  ): Promise<GetBuildingQueryResponse> {
    return this.queryBus.execute<GetBuildingsQuery, GetBuildingQueryResponse>(
      new GetBuildingsQuery(query),
    );
  }
}
