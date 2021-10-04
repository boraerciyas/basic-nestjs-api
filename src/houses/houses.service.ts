import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { House, HouseDocument } from './entities/house.entity';
import { Model } from 'mongoose';
import { CreateHouseDto } from './dto/create-house.dto';
import { AgentSchema } from '../agents/entities/agent.entity';
import * as mongoose from 'mongoose';
import { CitySchema } from '../cities/entities/city.entity';
import { UpdateHouseDto } from './dto/update-house.dto';

@Injectable()
export class HousesService {
  constructor(
    @InjectModel(House.name) private houseModel: Model<HouseDocument>,
  ) {}

  async create(createHouseDto: CreateHouseDto) {
    const houseModel = new this.houseModel(createHouseDto);
    if (houseModel.bedroomCount < 1 || houseModel.bedroomCount > 10) {
      throw new BadRequestException('Bedroom Count should be between 1 to 10.');
    }
    return await houseModel.save();
  }

  async findAll() {
    return await this.houseModel
      .find()
      .populate('city', 'name')
      .populate('agent', 'name')
      .exec();
  }

  /**
   * Finds house with given id.
   * @param id
   */
  async findOne(id: string) {
    return await this.findHouse(id);
  }

  /**
   * Removes house from db.
   * @param id
   */
  async remove(id: string) {
    return await this.houseModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }

  async findHousesByAgent(agentId: string) {
    const agentModel = mongoose.model('Agent', AgentSchema);
    let error = false;
    agentModel
      .findById(agentId)
      .exec()
      .catch((r) => {
        error = true;
        throw new NotFoundException('Agent can not be found!');
      });

    if (!error) {
      return await this.houseModel
        .find()
        .where('agent')
        .equals(agentId)
        .populate({
          path: 'agent',
          select: 'name',
        })
        .populate({
          path: 'city',
          select: 'name',
        })
        .exec()
        .catch((e) => {
          throw new NotFoundException('Agent can not be found!');
        });
    }
  }

  async findHousesByCity(cityId: string) {
    const cityModel = mongoose.model('City', CitySchema);
    let error = false;
    cityModel
      .findById(cityId)
      .exec()
      .catch((r) => {
        error = true;
        throw new NotFoundException('City can not be found!');
      });

    if (!error) {
      return await this.houseModel
        .find()
        .where('city')
        .equals(cityId)
        .populate({
          path: 'city',
          select: 'name',
        })
        .populate({
          path: 'agent',
          select: 'name',
        })
        .exec()
        .catch((e) => {
          throw new NotFoundException('City can not be found!');
        });
    }
  }

  async update(id: string, updateHouseDto: UpdateHouseDto) {
    return this.houseModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateHouseDto,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Finds house with given id if exists.
   * @returns Promise<House>
   * @param houseId
   * @private
   */
  private async findHouse(houseId: string): Promise<House> {
    let agent;
    try {
      agent = await this.houseModel
        .findById(houseId)
        .populate('city', 'name')
        .populate('agent', 'name')
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not found this house.');
    }

    return agent;
  }
}
