import { Test, TestingModule } from '@nestjs/testing';
import { BeanOfTheDayService } from './bean-of-the-day.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BeanOfTheDay } from './entities/bean-of-the-day.entity';
import { CoffeeBean } from '../coffee-beans/entities/coffee-bean.entity';

describe('BeanOfTheDayService', () => {
  let service: BeanOfTheDayService;
  let mockBeanOfTheDayRepo: Partial<Repository<BeanOfTheDay>>;
  let mockCoffeeBeanRepo: Partial<Repository<CoffeeBean>>;

  const mockCoffeeBean = {
    id: "1",
    name: "TESTBEAN",
    description: "Sample description",
    country: "TESTCOUNTRY",
    colour: "golden",
    cost: 18.57,
    image: "https://images.unsplash.com/photo-1641399756770-9b0b104e67c1",
  } as CoffeeBean;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
  };

  beforeEach(async () => {
    mockBeanOfTheDayRepo = {
      findOne: jest.fn(),
      create: jest.fn().mockImplementation((bean) => bean),  // Mock `create` method
      save: jest.fn().mockImplementation((bean) => Promise.resolve({ id: '1', ...bean })),
    };

    mockCoffeeBeanRepo = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeanOfTheDayService,
        { provide: getRepositoryToken(BeanOfTheDay), useValue: mockBeanOfTheDayRepo },
        { provide: getRepositoryToken(CoffeeBean), useValue: mockCoffeeBeanRepo },
      ],
    }).compile();

    service = module.get<BeanOfTheDayService>(BeanOfTheDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should select a new bean of the day', async () => {
    mockQueryBuilder.getOne.mockResolvedValueOnce(mockCoffeeBean);

    const result = await service.selectNewBean();
    expect(result.coffeeBean).toEqual(mockCoffeeBean);
    expect(mockBeanOfTheDayRepo.create).toHaveBeenCalledWith({ coffeeBean: mockCoffeeBean });
    expect(mockBeanOfTheDayRepo.save).toHaveBeenCalled();
  });

  it('should throw an error if no coffee bean is available to select', async () => {
    mockQueryBuilder.getOne.mockResolvedValueOnce(null);

    await expect(service.selectNewBean()).rejects.toThrow('No available coffee beans to select.');
  });

  it('should return the most recently selected bean of the day', async () => {
    mockBeanOfTheDayRepo.findOne = jest.fn().mockResolvedValueOnce({
      coffeeBean: mockCoffeeBean,
      selectedAt: new Date(),
    });

    const result = await service.getBeanOfTheDay();
    expect(result).toEqual(mockCoffeeBean);
    expect(mockBeanOfTheDayRepo.findOne).toHaveBeenCalledWith({
      where: {},
      order: { selectedAt: 'DESC' },
      relations: ['coffeeBean'],
    });
  });

  it('should return null if there is no bean of the day', async () => {
    mockBeanOfTheDayRepo.findOne = jest.fn().mockResolvedValueOnce(null);

    const result = await service.getBeanOfTheDay();
    expect(result).toBeNull();
  });
});
