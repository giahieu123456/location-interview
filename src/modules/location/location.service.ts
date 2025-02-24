import {
  BadRequestException,
  HttpException,
  HttpStatus,
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

  async update(id: number, updateData: Partial<Location>): Promise<void> {
    const cleanedObj = _.pickBy(updateData, _.identity);

    const descendants = await this.locationRepository.query(
      `
      WITH RECURSIVE location_tree AS (
        SELECT id, "parentId"
        FROM location
        WHERE id = $1 -- Root node

        UNION ALL

        SELECT l.id, l."parentId"
        FROM location l
        INNER JOIN location_tree lt ON l."parentId" = lt.id
      )
      SELECT id FROM location_tree;
      `,
      [id],
    );

    if (
      descendants.some(
        (item: { id: number }) => item.id === updateData.parentId,
      )
    ) {
      throw new BadRequestException(
        'A location cannot be assigned as a parent to one of its own descendants.',
      );
    }

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

  async getTreeLocationById(id: number): Promise<LocationResponse | null> {
    const result = await this.locationRepository.query(
      `
      WITH RECURSIVE location_tree AS (
        SELECT id, name, "locationNumber", area, "parentId", "buildingId"
        FROM location
        WHERE id = $1 -- Root node
  
        UNION ALL
  
        SELECT l.id, l.name, l."locationNumber", l.area, l."parentId", l."buildingId"
        FROM location l
        INNER JOIN location_tree lt ON l."parentId" = lt.id
      )
      SELECT * FROM location_tree;
      `,
      [id],
    );

    if (!result.length) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return this.locationTree(result, id);
  }

  locationTree(
    locations: LocationResponse[],
    rootId: number,
  ): LocationResponse | null {
    const locationMap = new Map<number, LocationResponse>();

    locations.forEach((location) => {
      locationMap.set(location.id, {
        ...location,
        children: [],
      });
    });

    const root = locationMap.get(rootId);
    if (!root) {
      return null;
    }

    const visited = new Set<number>();

    function buildTree(node: LocationResponse, ancestors: Set<number>) {
      if (ancestors.has(node.id)) {
        throw new Error(
          `Cycle detected: Location ${node.id} is its own ancestor.`,
        );
      }

      ancestors.add(node.id);
      visited.add(node.id);

      node.children = locations
        .filter((location) => location.parentId === node.id)
        .map((child) => {
          const childNode = locationMap.get(child.id);
          if (childNode) {
            buildTree(childNode, new Set(ancestors));
          }
          return childNode!;
        });

      ancestors.delete(node.id);
    }

    buildTree(root, new Set());

    return root;
  }
}
