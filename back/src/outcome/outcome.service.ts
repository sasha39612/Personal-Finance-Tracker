import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outcome } from './entities/outcome.entity';
import { Between, Repository } from 'typeorm';
import { OutcomeModel } from './models/outcome.model';
import { plainToInstance } from 'class-transformer';
import { OutcomeInput } from './dto/outcomes.input';
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  startOfYear,
  endOfYear,
  endOfMonth,
  getDate,
  getMonth,
} from 'date-fns';
import { OutcomePeriodModel } from './models/outcome-period.model';

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

  async getOutcomesChats(
      startDate: string,
      endDate: string,
      period: 'day' | 'month' | 'year',
    ): Promise<OutcomePeriodModel> {
      const startInitial = startOfDay(new Date('1970-01-01'));
      const endInitial = endOfDay(new Date('1970-01-01'));
      let startPeriod = startInitial;
      let endPeriod = endInitial;
  
      const randomRGBA = (border?: string) => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = Math.random().toFixed(2); // Alpha between 0.00 and 1.00
        return `rgba(${r}, ${g}, ${b}, ${border ? a : 1})`;
      };
  
      if (period === 'month') {
        startPeriod = startDate ? startOfMonth(new Date(startDate)) : startInitial;
        endPeriod = endDate ? endOfMonth(new Date(endDate)) : endInitial;
      } else if (period === 'year') { 
        startPeriod = startDate ? startOfYear(new Date(startDate)) : startInitial;
        endPeriod = endDate ? endOfYear(new Date(endDate)) : endInitial;
      } else if (period === 'day') {
        startPeriod = startDate ? new Date(startDate) : startInitial;
        endPeriod = endDate ? new Date(endDate) : endInitial;
      }
  
      const incomes = await this.outcomeRepository.find({
        where: {
          datum: Between(startOfDay(startPeriod), endOfDay(endPeriod)),
        },
        relations: ['categories_outcome', 'categories_outcome.entities_outcome'],
      });
  
      const incomeUpdated = incomes
        .map((income) => plainToInstance(OutcomeModel, income))
        .sort(
          (a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime(),
      );
  
      const result: OutcomePeriodModel = {
        labels: [],
        datasets: [],
      };
  
      if (period === 'year') {
        // Group incomes by month
        const monthlySums: { [month: string]: number } = {};
        incomeUpdated.forEach((data) => {
          const monthKey = new Date(data.datum).getFullYear() + '-' + (getMonth(new Date(data.datum)) + 1).toString().padStart(2, '0');
          let sumResult = 0;
          data.categories_outcome.forEach((category) => {
            sumResult += category.entities_outcome.reduce((acc, cur) => acc + cur.sum, 0);
          });
          if (!monthlySums[monthKey]) {
            monthlySums[monthKey] = 0;
          }
          monthlySums[monthKey] += sumResult;
        });
      
        // Clear previous labels and datasets
        result.labels = [];
        result.datasets = [{
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        }];
      
        Object.entries(monthlySums).forEach(([monthKey, sum]) => {
          // Use month number for label
          const monthNumber = new Date(monthKey + '-01').getMonth() + 1;
          result.labels.push(monthNumber.toString());
          result.datasets[0].data.push(sum);
          result.datasets[0].backgroundColor.push(randomRGBA());
          result.datasets[0].borderColor.push(randomRGBA('border'));
        });
  
        return result;
      }
  
      incomeUpdated.map((data) => {
        let sumResult = 0;
        if (period === 'month') {
          const dayOfMonth = (getDate(new Date(data.datum))).toString();
          result.labels.push(dayOfMonth);
        } else if (period === 'day') {
          result.labels.push(new Date(data.datum).toISOString().split('T')[0]);
        }
  
        data.categories_outcome.forEach((category) => {
          sumResult += category.entities_outcome.reduce((acc, cur) => acc + cur.sum, 0);
        });
  
        if (!result.datasets.length) {
          result.datasets.push({
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          });
        }
  
        result.datasets[0].data.push(sumResult);
        result.datasets[0].backgroundColor.push(randomRGBA());
        result.datasets[0].borderColor.push(randomRGBA('border'));
      });
  
      return result;
    }
}
