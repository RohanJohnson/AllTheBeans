import { Controller, Get, Post, Body, Param, Delete, Put, Query, NotImplementedException } from '@nestjs/common';
import { CoffeeBeansService } from './coffee-beans.service';
import { CoffeeBean } from './entities/coffee-bean.entity';

@Controller('coffee-beans')
export class CoffeeBeansController {
  constructor(private readonly coffeeBeansService: CoffeeBeansService) {}

  @Get()
  findAll(): Promise<CoffeeBean[]> {
    return this.coffeeBeansService.findAll();
  }
  
  // search needs to be above the ID wildcard otherwise it will be interpreted incorrectly
  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ): Promise<CoffeeBean[]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.coffeeBeansService.search(query, pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CoffeeBean> {
    return this.coffeeBeansService.findOne(id);
  }

  @Post()
  create(@Body() coffeeBean: CoffeeBean): Promise<CoffeeBean> {
    return this.coffeeBeansService.create(coffeeBean);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() coffeeBean: CoffeeBean): Promise<CoffeeBean> {
    return this.coffeeBeansService.update(id, coffeeBean);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.coffeeBeansService.remove(id);
  }
}
