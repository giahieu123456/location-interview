import { Controller, Delete, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteBuildingCommand } from './delete.command';
import { DeleteBuildingRequestParam } from './delete.request-param';

@ApiTags('Building')
@Controller({
  path: 'buildings',
  version: '1',
})
export class DeleteBuildingEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: ' delete a location' })
  @Delete(':id')
  update(@Param() { id }: DeleteBuildingRequestParam): Promise<void> {
    return this.commandBus.execute<DeleteBuildingCommand, void>(
      new DeleteBuildingCommand(id),
    );
  }
}
