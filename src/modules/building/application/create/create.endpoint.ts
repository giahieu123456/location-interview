import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBuildingCommand } from './create.command';
import { CreateBuildingRequestBody } from './create.request-body';

@ApiTags('Building')
@ApiBearerAuth()
@Controller({
  path: 'buildings',
  version: '1',
})
export class CreateBuildingEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Creates a new building' })
  @Post()
  create(@Body() body: CreateBuildingRequestBody): Promise<void> {
    return this.commandBus.execute<CreateBuildingCommand, void>(
      new CreateBuildingCommand(body),
    );
  }
}
