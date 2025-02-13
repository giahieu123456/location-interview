import { Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateLocationCommand } from './update.command';
import { UpdateBuildingRequestBody } from './update.request-body';
import { BuildingService } from '../../building.service';

@CommandHandler(UpdateLocationCommand)
export class UpdateBuildingHandler {
  constructor(private readonly locationService: BuildingService) {}
  private readonly logger = new Logger('building');
  public async execute(command: UpdateLocationCommand): Promise<void> {
    await this.updateLocation(command.body, command.id);
  }

  async updateLocation(
    data: UpdateBuildingRequestBody,
    id: string,
  ): Promise<void> {
    const { name } = data;
    await this.locationService.checkExist(+id);
    await this.locationService.update(+id, {
      name,
    });
  }
}
