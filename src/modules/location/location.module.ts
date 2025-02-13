import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as useCases from './application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../../entities/location.entity';
import { LocationService } from './location.service';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Location])],
  controllers: [...endpoints],
  providers: [...handlers, LocationService],
})
export class LocationModule {}
