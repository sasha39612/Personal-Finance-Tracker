import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outcome } from './entities/outcome.entity';
import { Between, Repository } from 'typeorm';
import { OutcomeModel } from './models/outcome.model';
import { plainToInstance } from 'class-transformer';
import { OutcomeInput } from './dto/outcomes.input';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class OutcomeService {
  constructor(
    @InjectRepository(Outcome)
    private outcomeRepository: Repository<Outcome>,
  ) {}

  async createOutcome(outcomeData: OutcomeInput): Promise<Outcome> {
    let savedOutcome: Outcome;
    const outcomeDB = await this.outcomeRepository.find({
      where: {
        datum: Between(
          startOfDay(outcomeData.datum),
          endOfDay(outcomeData.datum),
        ),
      },
      relations: ['categories_outcome', 'categories_outcome.entities_outcome'],
    });

    const categories_outcome = outcomeData.categories_outcome.map(
      (categoryOutcome) => {
        return {
          ...categoryOutcome,
          entitiesOutcome: categoryOutcome.entities_outcome.map(
            (entityOutcome) => ({
              ...entityOutcome,
            }),
          ),
        };
      },
    );

    if (outcomeDB?.length) {
      savedOutcome = await this.outcomeRepository.save({
        ...outcomeDB[0],
        categories_outcome,
      });
    } else {
      const outcome = this.outcomeRepository.create({
        ...outcomeData,
        categories_outcome,
      });
      savedOutcome = await this.outcomeRepository.save(outcome);
    }

    return this.outcomeRepository.findOne({
      where: { id: savedOutcome.id },
      relations: ['categories_outcome', 'categories_outcome.entities_outcome'],
    });
  }

  async getOutcomeById(id: number): Promise<OutcomeModel> {
    const outcome = await this.outcomeRepository.findOne({
      where: { id },
      relations: ['categories_outcome', 'categories_outcome.entities_outcome'],
    });
    return plainToInstance(OutcomeModel, outcome);
  }

  async getOutcomes(
    startDate: string,
    endDate: string,
  ): Promise<OutcomeModel[]> {
    const startInitial = startOfDay(new Date('1970-01-01'));
    const endInitial = endOfDay(new Date('1970-01-01'));
    const start = startDate ? new Date(startDate) : startInitial;
    const end = endDate ? new Date(endDate) : endInitial;

    let outcomes = await this.outcomeRepository.find({
      where: {
        datum: Between(startOfDay(start), endOfDay(end)),
      },
      relations: ['categories_outcome', 'categories_outcome.entities_outcome'],
    });

    if (!outcomes?.length) {
      //Call initial data.
      outcomes = await this.outcomeRepository.find({
        where: {
          datum: Between(startInitial, endInitial),
        },
        relations: [
          'categories_outcome',
          'categories_outcome.entities_outcome',
        ],
      });
    }

    return outcomes.map((outcome) => plainToInstance(OutcomeModel, outcome));
  }
}
