import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateLocationCommand } from './createLocation.command';
import { CreateLocationRequestBody } from './createLocation.request-body';
import { DataSource } from 'typeorm';
import { Location } from '../../../../entities/location.entity';
import { LocationService } from '../../location.service';

@CommandHandler(CreateLocationCommand)
export class CreateLocationHandler {
  private readonly logger = new Logger(CreateLocationHandler.name);

  constructor(private readonly locationService: LocationService) {}

  public async execute(command: CreateLocationCommand): Promise<void> {
    await this.createLocation(command.body);
  }

  private async createLocation(data: CreateLocationRequestBody): Promise<void> {
    const { name, locationNumber, area, parentId, buildingId } = data;

    let parent: Location | undefined = undefined;

    if (parentId) {
      const parentLocation = await this.locationService.findOne(parentId);
      if (!parentLocation) {
        throw new BadRequestException(
          `Parent location with ID ${parentId} does not exist.`,
        );
      }
      parent = parentLocation;
      if (parent.buildingId !== buildingId) {
        throw new BadRequestException(
          `can not  belong to the location from another building.`,
        );
      }
    }

    await this.locationService.create({
      name,
      locationNumber,
      area: parseFloat(area),
      parent,
      buildingId,
    });
  }
}
