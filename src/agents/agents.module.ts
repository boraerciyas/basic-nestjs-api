import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from './entities/agent.entity';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
  ],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
