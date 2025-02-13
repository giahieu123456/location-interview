import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as useCases from './application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../../entities/location.entity';
import { BuildingService } from './building.service';
import { Building } from '../../entities/building.entity';
import { LocationModule } from '../location/location.module';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Location, Building]),
    LocationModule,
  ],
  controllers: [...endpoints],
  providers: [...handlers, BuildingService],
})
export class BuildingModule {}
