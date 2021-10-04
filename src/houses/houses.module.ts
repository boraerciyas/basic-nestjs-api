import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { House, HouseSchema } from './entities/house.entity';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
  ],
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}
