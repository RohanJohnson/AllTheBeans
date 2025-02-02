import { Test, TestingModule } from '@nestjs/testing';
import { BeanOfTheDayController } from './bean-of-the-day.controller';
import { BeanOfTheDayService } from './bean-of-the-day.service';

describe('BeanOfTheDayController', () => {
  let controller: BeanOfTheDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeanOfTheDayController],
      providers: [BeanOfTheDayService],
    }).compile();

    controller = module.get<BeanOfTheDayController>(BeanOfTheDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
