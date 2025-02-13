import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppDataSource } from './database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './modules/location/location.module';
import { BuildingModule } from './modules/building/building.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    LocationModule,
    BuildingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
