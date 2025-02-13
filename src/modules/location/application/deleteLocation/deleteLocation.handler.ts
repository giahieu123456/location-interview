import { Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteLocationCommand } from './deleteLocation.command';

import { LocationService } from '../../location.service';

@CommandHandler(DeleteLocationCommand)
export class DeleteLocationHandler {
  constructor(private readonly locationService: LocationService) {}
  private readonly logger = new Logger('location');
  public async execute(command: DeleteLocationCommand): Promise<void> {
    await this.deleteLocation(command.id);
  }

  async deleteLocation(id: string): Promise<void> {
    await this.locationService.checkExist(+id);
    await this.locationService.remove(+id);
  }
}
