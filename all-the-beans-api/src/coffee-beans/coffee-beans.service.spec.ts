import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeBeansService } from './coffee-beans.service';
import { CoffeeBean } from './entities/coffee-bean.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CoffeeBeansService', () => {
  let service: CoffeeBeansService;
  let repository: Repository<CoffeeBean>;

  const mockCoffeeBean: CoffeeBean = {
    id: '1',
    name: 'TESTBEAN',
    description: 'Dolor fugiat duis dolore ut occaecat. Excepteur nostrud velit aute dolore sint labore do eu amet.',
    country: 'TESTCOUNTRY',
    colour: 'golden',
    cost: 18.57,
    image: 'https://images.unsplash.com/photo-1641399756770-9b0b104e67c1',
  };

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockCoffeeBean]),
    findOne: jest.fn().mockResolvedValue(mockCoffeeBean),
    save: jest.fn().mockResolvedValue(mockCoffeeBean),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([mockCoffeeBean]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeBeansService,
        {
          provide: getRepositoryToken(CoffeeBean),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CoffeeBeansService>(CoffeeBeansService);
    repository = module.get<Repository<CoffeeBean>>(getRepositoryToken(CoffeeBean));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all coffee beans', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockCoffeeBean]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single coffee bean', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual(mockCoffeeBean);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should throw NotFoundException if coffee bean not found', async () => {
    mockRepository.findOne.mockResolvedValueOnce(null);
    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a new coffee bean', async () => {
    const result = await service.create(mockCoffeeBean);
    expect(result).toEqual(mockCoffeeBean);
    expect(repository.save).toHaveBeenCalledWith(mockCoffeeBean);
  });

  it('should update a coffee bean', async () => {
    const updatedBean = { ...mockCoffeeBean, name: 'Updated Bean' };
    mockRepository.findOne.mockResolvedValueOnce(updatedBean);
    const result = await service.update('1', updatedBean);
    expect(result).toEqual(updatedBean);
    expect(repository.update).toHaveBeenCalledWith('1', updatedBean);
  });

  it('should delete a coffee bean', async () => {
    const result = await service.remove('1');
    expect(result).toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith('1');
  });

  it('should search for coffee beans by query', async () => {
    const result = await service.search('TESTCOUNTRY', 1, 10);
    expect(result).toEqual([mockCoffeeBean]);
    expect(repository.createQueryBuilder).toHaveBeenCalled();
  });
});
