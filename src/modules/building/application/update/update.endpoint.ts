import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateLocationCommand } from './update.command';
import { UpdateBuildingRequestBody } from './update.request-body';
import { UpdateLocationRequestParam } from './update.request-param';

@ApiTags('Building')
@Controller({
  path: 'buildings',
  version: '1',
})
export class UpdateBuildingEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Update a building' })
  @Put(':id')
  update(
    @Param() { id }: UpdateLocationRequestParam,
    @Body() body: UpdateBuildingRequestBody,
  ): Promise<void> {
    return this.commandBus.execute<UpdateLocationCommand, void>(
      new UpdateLocationCommand(id, body),
    );
  }
}
