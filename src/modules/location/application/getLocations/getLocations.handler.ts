import { QueryHandler } from '@nestjs/cqrs';
import { GetBuildingsQuery } from './getLocations.query';
import { GetLocationsRequestQuery } from './getLocations.request-query';
import { GetLocationQueryResponse } from './getLocations.response';
import { DataSource, ILike, Repository } from 'typeorm';
import { Location } from '../../../../entities/location.entity';

@QueryHandler(GetBuildingsQuery)
export class GetLocationHandler {
  constructor(private readonly dataSource: DataSource) {}

  public async execute(
    query: GetBuildingsQuery,
  ): Promise<GetLocationQueryResponse> {
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
    option: GetLocationsRequestQuery,
  ): Promise<{ data: Location[]; total: number }> {
    const locationRepository: Repository<Location> =
      this.dataSource.getRepository(Location);

    const { search, take, skip } = option;
    const whereCondition = search
      ? [
          { name: ILike(`%${search}%`) },
          { locationNumber: ILike(`%${search}%`) },
        ]
      : {};

    // Execute the query with pagination and ordering
    const [data, total] = await locationRepository.findAndCount({
      where: whereCondition,
      skip,
      take,
      order: { name: 'ASC' },
      relations: ['building', 'parent'],
    });

    return { data, total };
  }
}
