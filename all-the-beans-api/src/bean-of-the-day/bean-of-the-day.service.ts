import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BeanOfTheDay } from './entities/bean-of-the-day.entity';
import { CoffeeBean } from '../coffee-beans/entities/coffee-bean.entity';

@Injectable()
export class BeanOfTheDayService {
  constructor(
    @InjectRepository(BeanOfTheDay) private beanOfTheDayRepo: Repository<BeanOfTheDay>,
    @InjectRepository(CoffeeBean) private coffeeBeanRepo: Repository<CoffeeBean>,
  ) {}

  async selectNewBean(): Promise<BeanOfTheDay> {
    
    // Get the last selected bean
    let lastSelection: BeanOfTheDay | null = null;

    try{
      lastSelection = await this.beanOfTheDayRepo.findOne({ order: { selectedAt: 'DESC' } });
    }
    catch(e){}

    // Query for a random bean, ensuring it's different from the last one
    let query = this.coffeeBeanRepo.createQueryBuilder('bean').orderBy('RANDOM()').take(1);
    if (lastSelection != null) {
      query = query.where('bean.id != :lastId', { lastId: lastSelection.coffeeBean.id });
    }
    const newBean = await query.getOne();

    if (!newBean) {
      throw new Error('No available coffee beans to select.');
    }

    // Save the new selection
    const beanOfTheDay = this.beanOfTheDayRepo.create({ coffeeBean: newBean });
    return await this.beanOfTheDayRepo.save(beanOfTheDay);
  }

  async getBeanOfTheDay(): Promise<CoffeeBean | null> {

    const beanOfTheDay = await this.beanOfTheDayRepo.findOne({
      where: {},
      order: { selectedAt: 'DESC' },
      relations: ['coffeeBean'],
    });
  
    return beanOfTheDay ? beanOfTheDay.coffeeBean : null;
  }
}
