import { Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateBuildingCommand } from './create.command';
import { CreateBuildingRequestBody } from './create.request-body';

import { BuildingService } from '../../building.service';

@CommandHandler(CreateBuildingCommand)
export class CreateBuildingHandler {
  private readonly logger = new Logger(CreateBuildingHandler.name);

  constructor(private readonly buildingService: BuildingService) {}

  public async execute(command: CreateBuildingCommand): Promise<void> {
    await this.createBuilding(command.body);
  }

  private async createBuilding(data: CreateBuildingRequestBody): Promise<void> {
    const { name } = data;

    await this.buildingService.create({
      name,
    });
  }
}
