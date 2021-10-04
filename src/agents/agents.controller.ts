import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { AgentsService } from './agents.service';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(id);
  }
}
