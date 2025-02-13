import { Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteBuildingCommand } from './delete.command';

import { BuildingService } from '../../building.service';

@CommandHandler(DeleteBuildingCommand)
export class DeleteBuildingHandler {
  constructor(private readonly building: BuildingService) {}
  private readonly logger = new Logger('building');
  public async execute(command: DeleteBuildingCommand): Promise<void> {
    await this.deleteLocation(command.id);
  }

  async deleteLocation(id: string): Promise<void> {
    await this.building.checkExist(+id);
    await this.building.remove(+id);
  }
}
