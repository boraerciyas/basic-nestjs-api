import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHouseDto: UpdateHouseDto,
  ) {
    return await this.housesService.update(id, updateHouseDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.housesService.findOne(id);
  }

  @Get('byAgent/:id')
  async findHousesByAgent(@Param('id') agentId: string) {
    return await this.housesService.findHousesByAgent(agentId);
  }

  @Get('byCity/:id')
  async findHousesByCity(@Param('id') cityId: string) {
    return await this.housesService.findHousesByCity(cityId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.housesService.remove(id);
  }
}
