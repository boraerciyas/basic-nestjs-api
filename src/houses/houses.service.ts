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

@Injectable()
export class HousesService {
  constructor(
    @InjectModel(House.name) private houseModel: Model<HouseDocument>,
  ) {}

  create(createHouseDto: CreateHouseDto) {
    const houseModel = new this.houseModel(createHouseDto);
    if (houseModel.bedroomCount < 1 || houseModel.bedroomCount > 10) {
      throw new BadRequestException('Bedroom Count should be between 1 to 10.');
    }
    return houseModel.save();
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
        console.log('Hata: ' + r);
        error = true;
        throw new NotFoundException('Agent can not be found!');
      });

    console.log(error);
    if (error) {
      // return new NotFoundException('Agent can not be found!');
    } else {
      return await this.houseModel
        .find()
        .where('agent')
        .equals(agentId)
        .populate({
          path: 'agent',
          select: 'name',
        })
        .exec()
        .catch((e) => {
          console.log('Hata2: ' + e);
          throw new NotFoundException('Agent can not be found!');
        });
    }
    /*try {

    } catch (error) {
      throw new NotFoundException('Agent can not be found!');
    }*/
    /*await agentModel
      .findById(agentId)
      .exec()
      .catch(function (err) {
        console.log(err);
        throw new NotFoundException('Agent can not be found!');
      });*/
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
