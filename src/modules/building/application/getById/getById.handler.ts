import { QueryHandler } from '@nestjs/cqrs';
import { GetBuildingsQuery } from './getById.query';
import { DataSource } from 'typeorm';
import { BuildingResponse } from './getBuilding.response';
import { BuildingService } from '../../building.service';

@QueryHandler(GetBuildingsQuery)
export class GetLocationByIdHandler {
  constructor(private readonly buildingService: BuildingService) {}

  public async execute(
    query: GetBuildingsQuery,
  ): Promise<BuildingResponse | null> {
    return this.getLocation(+query.id);
  }

  private async getLocation(id: number): Promise<BuildingResponse | null> {
    await this.buildingService.checkExist(+id);
    return await this.buildingService.getTreeBuilding(+id);
  }
}
