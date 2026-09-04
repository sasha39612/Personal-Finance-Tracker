import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IncomeService } from './income.service';
import { Income } from './entities/income.entity';

describe('IncomeService', () => {
  let service: IncomeService;
  let repository: jest.Mocked<Repository<Income>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IncomeService,
        {
          provide: getRepositoryToken(Income),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(IncomeService);
    repository = moduleRef.get(getRepositoryToken(Income));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createIncome', () => {
    const incomeData = {
      datum: new Date('2025-09-01'),
      categories: [
        { title: 'Salary', entities: [{ description: 'Employer', tooltip: 'Main job', sum: 5000 }] },
      ],
    };

    it('creates a new income when none exists for that date', async () => {
      repository.find.mockResolvedValue([]);
      repository.create.mockReturnValue({ id: 1 } as Income);
      repository.save.mockResolvedValue({ id: 1 } as Income);
      repository.findOne.mockResolvedValue({ id: 1, ...incomeData } as unknown as Income);

      const result = await service.createIncome(incomeData as any);

      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual({ id: 1, ...incomeData });
    });

    it('merges into the existing income when one exists for that date', async () => {
      const existing = { id: 7, datum: incomeData.datum, categories: [] } as unknown as Income;
      repository.find.mockResolvedValue([existing]);
      repository.save.mockResolvedValue({ id: 7 } as Income);
      repository.findOne.mockResolvedValue({ id: 7, ...incomeData } as unknown as Income);

      await service.createIncome(incomeData as any);

      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: 7 }),
      );
    });

    it('wraps repository failures in an InternalServerErrorException', async () => {
      repository.find.mockRejectedValue(new Error('connection lost'));

      await expect(service.createIncome(incomeData as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getIncomes', () => {
    it('returns mapped incomes for the given range', async () => {
      repository.find.mockResolvedValue([
        { id: 1, datum: new Date('2025-09-01'), categories: [] } as unknown as Income,
      ]);

      const result = await service.getIncomes('2025-09-01', '2025-09-01');

      expect(result).toHaveLength(1);
    });

    it('wraps repository failures in an InternalServerErrorException', async () => {
      repository.find.mockRejectedValue(new Error('connection lost'));

      await expect(service.getIncomes('2025-09-01', '2025-09-01')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
