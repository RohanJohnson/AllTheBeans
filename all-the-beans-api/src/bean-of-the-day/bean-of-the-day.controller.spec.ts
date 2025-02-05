import { Test, TestingModule } from '@nestjs/testing';
import { BeanOfTheDayController } from './bean-of-the-day.controller';
import { BeanOfTheDayService } from './bean-of-the-day.service';
import { CoffeeBean } from '../coffee-beans/entities/coffee-bean.entity';
import { NotFoundException } from '@nestjs/common';

describe('BeanOfTheDayController', () => {
  let controller: BeanOfTheDayController;
  let service: BeanOfTheDayService;

  const mockCoffeeBean = {
    id: '1',
    name: 'TESTBEAN',
    description: 'Sample description',
    country: 'TESTCOUNTRY',
    colour: 'golden',
    cost: 18.57,
    image: 'https://images.unsplash.com/photo-1641399756770-9b0b104e67c1',
  } as CoffeeBean;

  const mockBeanOfTheDayService = {
    getBeanOfTheDay: jest.fn().mockResolvedValue(mockCoffeeBean),
    selectNewBean: jest.fn().mockResolvedValue({ id: '1', coffeeBean: mockCoffeeBean, selectedAt: new Date() }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeanOfTheDayController],
      providers: [
        {
          provide: BeanOfTheDayService,
          useValue: mockBeanOfTheDayService,
        },
      ],
    }).compile();

    controller = module.get<BeanOfTheDayController>(BeanOfTheDayController);
    service = module.get<BeanOfTheDayService>(BeanOfTheDayService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBeanOfTheDay', () => {
    it('should return the current bean of the day', async () => {
      const result = await controller.getBeanOfTheDay();
      expect(result).toEqual(mockCoffeeBean);
      expect(service.getBeanOfTheDay).toHaveBeenCalled();
    });

    it('should return a message if no bean is selected', async () => {
      mockBeanOfTheDayService.getBeanOfTheDay.mockResolvedValueOnce(null);
      const result = await controller.getBeanOfTheDay();
      expect(result).toEqual({ message: 'No bean selected yet.' });
      expect(service.getBeanOfTheDay).toHaveBeenCalled();
    });
  });

  describe('selectNewBean', () => {
    it('should select and return a new bean of the day', async () => {
      const result = await controller.selectNewBean();
      expect(result).toEqual({ id: '1', coffeeBean: mockCoffeeBean, selectedAt: expect.any(Date) });
      expect(service.selectNewBean).toHaveBeenCalled();
    });

    it('should throw an error if no coffee bean is available', async () => {
      mockBeanOfTheDayService.selectNewBean.mockRejectedValueOnce(new Error('No available coffee beans to select.'));
      await expect(controller.selectNewBean()).rejects.toThrow('No available coffee beans to select.');
      expect(service.selectNewBean).toHaveBeenCalled();
    });
  });
});
