import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  create(createCityDto: CreateCityDto) {
    const cityModel = new this.cityModel(createCityDto);
    return cityModel.save();
  }

  findAll() {
    return this.cityModel.find();
  }

  findOne(id: string) {
    return this.cityModel.findById(id);
  }

  remove(id: string) {
    return this.cityModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
