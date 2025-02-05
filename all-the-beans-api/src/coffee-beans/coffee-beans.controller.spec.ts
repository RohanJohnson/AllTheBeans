import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeBeansController } from './coffee-beans.controller';
import { CoffeeBeansService } from './coffee-beans.service';
import { CoffeeBean } from './entities/coffee-bean.entity';
import { NotFoundException } from '@nestjs/common';

describe('CoffeeBeansController', () => {
  let controller: CoffeeBeansController;
  let service: CoffeeBeansService;

  const mockCoffeeBean: CoffeeBean = {
    id: '1',
    name: 'TESTBEAN',
    description: 'Dolor fugiat duis dolore ut occaecat. Excepteur nostrud velit aute dolore sint labore do eu amet.',
    country: 'TESTCOUNTRY',
    colour: 'golden',
    cost: 18.57,
    image: 'https://images.unsplash.com/photo-1641399756770-9b0b104e67c1',
  };

  const mockCoffeeBeansService = {
    findAll: jest.fn().mockResolvedValue([mockCoffeeBean]),
    findOne: jest.fn().mockResolvedValue(mockCoffeeBean),
    create: jest.fn().mockResolvedValue(mockCoffeeBean),
    update: jest.fn().mockResolvedValue(mockCoffeeBean),
    remove: jest.fn().mockResolvedValue(undefined),
    search: jest.fn().mockResolvedValue([mockCoffeeBean]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeBeansController],
      providers: [
        {
          provide: CoffeeBeansService,
          useValue: mockCoffeeBeansService,
        },
      ],
    }).compile();

    controller = module.get<CoffeeBeansController>(CoffeeBeansController);
    service = module.get<CoffeeBeansService>(CoffeeBeansService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all coffee beans', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockCoffeeBean]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single coffee bean', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockCoffeeBean);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if coffee bean not found', async () => {
    mockCoffeeBeansService.findOne.mockRejectedValueOnce(new NotFoundException());
    await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a new coffee bean', async () => {
    const result = await controller.create(mockCoffeeBean);
    expect(result).toEqual(mockCoffeeBean);
    expect(service.create).toHaveBeenCalledWith(mockCoffeeBean);
  });

  it('should update a coffee bean', async () => {
    const updatedBean = { ...mockCoffeeBean, name: 'Updated Bean' };
    mockCoffeeBeansService.update.mockResolvedValueOnce(updatedBean);
    const result = await controller.update('1', updatedBean);
    expect(result).toEqual(updatedBean);
    expect(service.update).toHaveBeenCalledWith('1', updatedBean);
  });

  it('should delete a coffee bean', async () => {
    const result = await controller.remove('1');
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('should search for coffee beans', async () => {
    const result = await controller.search('Ethiopia', '1', '10');
    expect(result).toEqual([mockCoffeeBean]);
    expect(service.search).toHaveBeenCalledWith('Ethiopia', 1, 10);
  });
});
