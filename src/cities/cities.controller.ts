import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citiesService.remove(id);
  }
}
