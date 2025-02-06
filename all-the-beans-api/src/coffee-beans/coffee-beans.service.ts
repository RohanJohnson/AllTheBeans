import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeeBean } from './entities/coffee-bean.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CoffeeBeansService {
  constructor(
    @InjectRepository(CoffeeBean)
    private coffeeBeanRepository: Repository<CoffeeBean>,
  ) {}

  // Get all beans in the database
  findAll(): Promise<CoffeeBean[]> {
    return this.coffeeBeanRepository.find();
  }

  // Find a bean in the database by ID
  async findOne(id: string): Promise<CoffeeBean> {
    const bean = await this.coffeeBeanRepository.findOne({ where: { id } });
    if (!bean) {
      throw new NotFoundException(`CoffeeBean with ID ${id} not found`);
    }
    return bean;
  }

  // Add a new bean to the database
  create(coffeeBean: CoffeeBean): Promise<CoffeeBean> {
    return this.coffeeBeanRepository.save(coffeeBean);
  }

  // Update values of a pre-existing bean in the database
  async update(id: string, coffeeBean: CoffeeBean): Promise<CoffeeBean> {
    await this.coffeeBeanRepository.update(id, coffeeBean);
    return this.findOne(id);
  }

  // Delete a bean from the database
  async remove(id: string): Promise<void> {
    await this.coffeeBeanRepository.delete(id);
  }

  // Search the database for beans based on a querystring
  // The querystring can be used to query name, country and colour
  async search(query: string, page: number = 1, limit: number = 10): Promise<CoffeeBean[]> {
    return this.coffeeBeanRepository.createQueryBuilder('bean')
      .where('bean.name ILIKE :query OR bean.country ILIKE :query OR bean.colour ILIKE :query', { query: `%${query}%` })
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }  
  
}
