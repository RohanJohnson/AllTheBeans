import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeBeansController } from './coffee-beans.controller';
import { CoffeeBeansService } from './coffee-beans.service';

describe('CoffeeBeansController', () => {
  let controller: CoffeeBeansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeBeansController],
      providers: [CoffeeBeansService],
    }).compile();

    controller = module.get<CoffeeBeansController>(CoffeeBeansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
