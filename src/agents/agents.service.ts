import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent, AgentDocument } from './entities/agent.entity';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent.name) private agentModel: Model<AgentDocument>,
  ) {}

  async create(createAgentDto: CreateAgentDto) {
    return await new this.agentModel(createAgentDto).save();
  }

  async findAll() {
    return await this.agentModel.find().populate('city', 'name').exec();
  }

  async findOne(id: string) {
    return await this.findAgent(id);
  }

  async remove(id: string) {
    return await this.agentModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }

  /**
   * Finds agent with given id if exists.
   * @returns Promise<Agent>
   * @param agentId
   * @private
   */
  private async findAgent(agentId: string): Promise<Agent> {
    let agent;
    try {
      agent = await this.agentModel
        .findById(agentId)
        .populate('city', 'name')
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not found this agent.');
    }

    return agent;
  }
}
