import { Controller, Delete, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteLocationCommand } from './deleteLocation.command';
import { SoftDeleteLocationRequestParam } from './deleteLocation.request-param';

@ApiTags('Location')
@Controller({
  path: 'location',
  version: '1',
})
export class DeleteLocationEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: ' delete a location' })
  @Delete(':id')
  update(@Param() { id }: SoftDeleteLocationRequestParam): Promise<void> {
    return this.commandBus.execute<DeleteLocationCommand, void>(
      new DeleteLocationCommand(id),
    );
  }
}
