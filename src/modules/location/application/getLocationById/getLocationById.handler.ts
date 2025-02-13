import { QueryHandler } from '@nestjs/cqrs';
import { GetBuildingsQuery } from './getLocationById.query';
import { DataSource } from 'typeorm';
import { LocationResponse } from './getlocation.response';
import { LocationService } from '../../location.service';

@QueryHandler(GetBuildingsQuery)
export class GetLocationByIdHandler {
  constructor(private readonly locationService: LocationService) {}

  public async execute(query: GetBuildingsQuery): Promise<LocationResponse> {
    return this.getLocation(+query.id);
  }

  private async getLocation(id: number): Promise<LocationResponse> {
    await this.locationService.checkExist(+id);
    return this.locationService.getTreeLocationById(id);
  }
}
