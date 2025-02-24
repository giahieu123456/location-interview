import { QueryHandler } from '@nestjs/cqrs';
import { GetBuildingsQuery } from './getAll.query';
import { GetBuildingRequestQuery } from './getAll.request-query';
import { GetBuildingQueryResponse } from './getAll.response';
import { DataSource, ILike, Repository } from 'typeorm';
import { Building } from '../../../../entities/building.entity';
import { BuildingService } from '../../building.service';

@QueryHandler(GetBuildingsQuery)
export class GetBuildingHandler {
  constructor(
    private readonly buildingService: BuildingService,
    private readonly dataSource: DataSource,
  ) {}

  public async execute(
    query: GetBuildingsQuery,
  ): Promise<GetBuildingQueryResponse> {
    const { take, skip } = query.option;
    const { total, data } = await this.getLocations(query.option);

    return {
      skip: +skip,
      take: +take,
      total,
      data: data as any,
    };
  }

  public async getLocations(
    option: GetBuildingRequestQuery,
  ): Promise<{ data: Building[]; total: number }> {
    const buildingRepository: Repository<Building> =
      this.dataSource.getRepository(Building);
    const { search, take, skip } = option;
    const whereCondition = search ? [{ name: ILike(`%${search}%`) }] : {};

    const [buildings, total] = await buildingRepository.findAndCount({
      where: whereCondition,
      skip,
      take,
      order: { name: 'ASC' },
      select: {
        id: true,
      },
    });
    const buildingIds = buildings.map((item) => item.id);
    const data = await this.buildingService.getTreeBuildings(buildingIds);

    return { data, total };
  }
}
