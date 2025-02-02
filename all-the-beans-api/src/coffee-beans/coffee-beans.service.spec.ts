import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeBeansService } from './coffee-beans.service';

describe('CoffeeBeansService', () => {
  let service: CoffeeBeansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeBeansService],
    }).compile();

    service = module.get<CoffeeBeansService>(CoffeeBeansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
