import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BeanOfTheDayService } from './bean-of-the-day.service';

@Injectable()
export class BeanSchedulerService {
  constructor(private readonly beanOfTheDayService: BeanOfTheDayService) {}

  @Cron('0 0 * * *') // Runs at midnight daily
  async handleCron() {
    console.log('Selecting new Bean of the Day...');
    await this.beanOfTheDayService.selectNewBean();
  }
}
