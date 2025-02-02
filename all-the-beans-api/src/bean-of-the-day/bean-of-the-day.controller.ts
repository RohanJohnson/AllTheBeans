import { Controller, Get } from '@nestjs/common';
import { BeanOfTheDayService } from './bean-of-the-day.service';

@Controller('bean-of-the-day')
export class BeanOfTheDayController {
  constructor(private readonly beanOfTheDayService: BeanOfTheDayService) {}

  @Get()
  async getBeanOfTheDay() {
    const bean = await this.beanOfTheDayService.getBeanOfTheDay();
    return bean || { message: 'No bean selected yet.' };
  }

  @Get('next')
  async selectNewBean(){
    return await this.beanOfTheDayService.selectNewBean();
  }
}
