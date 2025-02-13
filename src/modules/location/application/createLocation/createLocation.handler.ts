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
    const { name, locationNumber, area, parentId } = data;

    if (!parentId) {
      const rootLocation = await this.locationService.findRootLocation();
      if (rootLocation) {
        throw new BadRequestException('The root location already exist');
      }
    }
    let parent: Location | undefined = undefined;

    if (parentId) {
      const parentLocation = await this.locationService.findOne(parentId);
      if (!parentLocation) {
        throw new BadRequestException(
          `Parent location with ID ${parentId} does not exist.`,
        );
      }

      parent = parentLocation;
    }

    await this.locationService.create({
      name,
      locationNumber,
      area: parseFloat(area),
      parent,
    });
  }
}
