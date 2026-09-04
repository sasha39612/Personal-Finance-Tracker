import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OutcomeService } from './outcome.service';
import { Outcome } from './entities/outcome.entity';

describe('OutcomeService', () => {
  let service: OutcomeService;
  let repository: jest.Mocked<Repository<Outcome>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        OutcomeService,
        {
          provide: getRepositoryToken(Outcome),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(OutcomeService);
    repository = moduleRef.get(getRepositoryToken(Outcome));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOutcome', () => {
    const outcomeData = {
      datum: new Date('2025-09-01'),
      categories_outcome: [
        { title: 'Rent', entities_outcome: [{ description: 'Landlord', tooltip: 'Monthly rent', sum: 1200 }] },
      ],
    };

    it('creates a new outcome when none exists for that date', async () => {
      repository.find.mockResolvedValue([]);
      repository.create.mockReturnValue({ id: 1 } as Outcome);
      repository.save.mockResolvedValue({ id: 1 } as Outcome);
      repository.findOne.mockResolvedValue({ id: 1, ...outcomeData } as unknown as Outcome);

      const result = await service.createOutcome(outcomeData as any);

      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual({ id: 1, ...outcomeData });
    });

    it('merges into the existing outcome when one exists for that date', async () => {
      const existing = { id: 7, datum: outcomeData.datum, categories_outcome: [] } as unknown as Outcome;
      repository.find.mockResolvedValue([existing]);
      repository.save.mockResolvedValue({ id: 7 } as Outcome);
      repository.findOne.mockResolvedValue({ id: 7, ...outcomeData } as unknown as Outcome);

      await service.createOutcome(outcomeData as any);

      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: 7 }),
      );
    });

    it('wraps repository failures in an InternalServerErrorException', async () => {
      repository.find.mockRejectedValue(new Error('connection lost'));

      await expect(service.createOutcome(outcomeData as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getOutcomes', () => {
    it('returns mapped outcomes for the given range', async () => {
      repository.find.mockResolvedValue([
        { id: 1, datum: new Date('2025-09-01'), categories_outcome: [] } as unknown as Outcome,
      ]);

      const result = await service.getOutcomes('2025-09-01', '2025-09-01');

      expect(result).toHaveLength(1);
    });

    it('wraps repository failures in an InternalServerErrorException', async () => {
      repository.find.mockRejectedValue(new Error('connection lost'));

      await expect(service.getOutcomes('2025-09-01', '2025-09-01')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
