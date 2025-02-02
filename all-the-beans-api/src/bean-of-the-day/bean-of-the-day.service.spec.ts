import { Test, TestingModule } from '@nestjs/testing';
import { BeanOfTheDayService } from './bean-of-the-day.service';

describe('BeanOfTheDayService', () => {
  let service: BeanOfTheDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeanOfTheDayService],
    }).compile();

    service = module.get<BeanOfTheDayService>(BeanOfTheDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
