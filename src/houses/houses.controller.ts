import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.housesService.create(createHouseDto);
  }

  @Get()
  async findAll() {
    return await this.housesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.housesService.findOne(id);
  }

  @Get('byAgent/:id')
  async findHousesByAgent(@Param('id') agentId: string) {
    return await this.housesService.findHousesByAgent(agentId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.housesService.remove(id);
  }
}
