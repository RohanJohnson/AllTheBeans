import { Module } from '@nestjs/common';
import { BeanOfTheDayService } from './bean-of-the-day.service';
import { BeanOfTheDayController } from './bean-of-the-day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeanOfTheDay } from './entities/bean-of-the-day.entity';
import { CoffeeBean } from 'src/coffee-beans/entities/coffee-bean.entity';
import { BeanSchedulerService } from './bean-scheduler.service';

@Module({
  controllers: [BeanOfTheDayController],
  providers: [BeanOfTheDayService],
})

@Module({
  imports: [TypeOrmModule.forFeature([BeanOfTheDay, CoffeeBean])],
  controllers: [BeanOfTheDayController],
  providers: [BeanOfTheDayService, BeanSchedulerService],
})

export class BeanOfTheDayModule {}
