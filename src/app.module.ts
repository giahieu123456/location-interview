import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppDataSource } from './database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    LocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
