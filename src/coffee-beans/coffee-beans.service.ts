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

  findAll(): Promise<CoffeeBean[]> {
    return this.coffeeBeanRepository.find();
  }

  async findOne(id: string): Promise<CoffeeBean> {
    const bean = await this.coffeeBeanRepository.findOne({ where: { id } });
    if (!bean) {
      throw new NotFoundException(`CoffeeBean with ID ${id} not found`);
    }
    return bean;
  }

  create(coffeeBean: CoffeeBean): Promise<CoffeeBean> {
    return this.coffeeBeanRepository.save(coffeeBean);
  }

  async update(id: string, coffeeBean: CoffeeBean): Promise<CoffeeBean> {
    await this.coffeeBeanRepository.update(id, coffeeBean);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.coffeeBeanRepository.delete(id);
  }

  async search(query: string, page: number = 1, limit: number = 10): Promise<CoffeeBean[]> {
    return this.coffeeBeanRepository.createQueryBuilder('bean')
      .where('bean.name ILIKE :query OR bean.country ILIKE :query OR bean.colour ILIKE :query', { query: `%${query}%` })
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }  
  
}
