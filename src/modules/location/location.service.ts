import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../../entities/location.entity';
import { LocationResponse } from './application/getLocationById/getlocation.response';
import * as _ from 'lodash';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(locationData: Partial<Location>): Promise<Location> {
    try {
      const location = this.locationRepository.create(locationData);
      return this.locationRepository.save(location);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async checkExist(id: number): Promise<void> {
    const existLocation = await this.locationRepository.exists({
      where: {
        id,
      },
    });

    if (!existLocation) {
      throw new BadRequestException('The location does not exist');
    }
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  async findRootLocation(): Promise<Location | null> {
    return await this.locationRepository.findOne({
      where: { parentId: undefined },
    });
  }

  async update(id: number, updateData: Partial<Location>): Promise<void> {
    const cleanedObj = _.pickBy(updateData, _.identity);
    const location = await this.locationRepository.preload({
      id,
      ...cleanedObj,
    });
    if (location) {
      await this.locationRepository.save(location);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
  }

  async getTreeLocationById(id: number) {
    const result = await this.locationRepository.query(
      `
        WITH RECURSIVE location_tree AS (
        SELECT id, name, "locationNumber", area, "parentId"
        FROM location
        WHERE id = $1 -- Root node

        UNION ALL

        SELECT l.id, l.name, l."locationNumber", l.area, l."parentId"
        FROM location l
        INNER JOIN location_tree lt ON l."parentId" = lt.id
      )
      SELECT * FROM location_tree;
      `,
      [id],
    );
    return this.locationTree(result, id);
  }

  locationTree(locations: any[], rootId: number): LocationResponse {
    const locationMap = new Map<number, LocationResponse>();
    locations.forEach((location) => {
      locationMap.set(location.id, {
        id: location.id,
        name: location.name,
        locationNumber: location.locationNumber,
        area: location.area,
        parentId: location.parentId,
        children: [],
      });
    });

    let root: LocationResponse | null = null;

    locations.forEach((location) => {
      const locationNode = locationMap.get(location.id);

      if (!locationNode) return;

      if (location.parentId === null || location.id === rootId) {
        root = locationNode;
      } else {
        const parentNode = locationMap.get(location.parentId);
        if (parentNode) {
          parentNode.children.push(locationNode);
        }
      }
    });

    return root!;
  }
}
