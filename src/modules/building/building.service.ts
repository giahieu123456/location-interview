import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { Building } from '../../entities/building.entity';
import { Location } from '../../entities/location.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRespository: Repository<Building>,
    @InjectRepository(Location)
    private readonly locationRespository: Repository<Location>,
  ) {}

  async create(buildingBody: Partial<Building>): Promise<Building> {
    try {
      const building = this.buildingRespository.create(buildingBody);
      return this.buildingRespository.save(building);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Building[]> {
    return this.buildingRespository.find();
  }

  async checkExist(id: number): Promise<void> {
    const existBuilding = await this.buildingRespository.exists({
      where: {
        id,
      },
    });

    if (!existBuilding) {
      throw new BadRequestException('The building does not exist');
    }
  }

  async findOne(id: number): Promise<Building> {
    const building = await this.buildingRespository.findOne({ where: { id } });
    if (!building) {
      throw new NotFoundException(`The building with ID ${id} not found`);
    }
    return building;
  }

  async update(id: number, updateData: Partial<Building>): Promise<void> {
    const cleanedObj = _.pickBy(updateData, _.identity);
    const building = await this.buildingRespository.preload({
      id,
      ...cleanedObj,
    });
    if (building) {
      await this.buildingRespository.save(building);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.buildingRespository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`The building with ID ${id} not found`);
    }
  }

  async getTreeBuilding(buildingId: number) {
    const building = await this.buildingRespository.findOne({
      where: { id: buildingId },
    });

    if (!building) {
      throw new Error('Building not found');
    }

    const locations = await this.locationRespository.find({
      where: { buildingId },
    });

    const locationMap = new Map<number, Location>();
    const rootLocations: Location[] = [];

    locations.forEach((location) => {
      location.children = [];
      locationMap.set(location.id, location);
    });

    locations.forEach((location) => {
      if (location.parentId) {
        const parent = locationMap.get(location.parentId);
        if (parent) {
          parent.children.push(location);
        }
      } else {
        rootLocations.push(location);
      }
    });

    return {
      ...building,
      locations: rootLocations,
    };
  }
}
