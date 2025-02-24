import { Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateLocationCommand } from './updateLocation.command';
import { UpdateLocationRequestBody } from './updateLocation.request-body';
import { LocationService } from '../../location.service';

@CommandHandler(UpdateLocationCommand)
export class UpdateLocationHandler {
  constructor(private readonly locationService: LocationService) {}
  private readonly logger = new Logger('location');
  public async execute(command: UpdateLocationCommand): Promise<void> {
    await this.updateLocation(command.body, command.id);
  }

  async updateLocation(
    data: UpdateLocationRequestBody,
    id: string,
  ): Promise<void> {
    const { name, area, locationNumber, parentId } = data;
    await this.locationService.checkExist(+id);
    await this.locationService.update(+id, {
      area: area ? parseFloat(area) : undefined,
      name,
      locationNumber,
      parentId,
    });
  }
}
