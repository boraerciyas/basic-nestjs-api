import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './entities/city.entity';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
