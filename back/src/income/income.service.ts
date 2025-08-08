import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Between, Repository } from 'typeorm';
import { IncomeModel } from './models/income.model';
import { plainToInstance } from 'class-transformer';
import { IncomeInput } from './dto/incomes.input';
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  getDate,
} from 'date-fns';
import { IncomePeriodModel } from './models/income-period.model';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}

  async createIncome(incomeData: IncomeInput): Promise<Income> {
    let savedIncome: Income;
    const incomeDB = await this.incomeRepository.find({
      where: {
        datum: Between(
          startOfDay(incomeData.datum),
          endOfDay(incomeData.datum),
        ),
      },
      relations: ['categories', 'categories.entities'],
    });

    const categories = incomeData.categories.map((category) => {
      return {
        ...category,
        entities: category.entities.map((entity) => ({
          ...entity,
        })),
      };
    });

    if (incomeDB?.length) {
      savedIncome = await this.incomeRepository.save({
        ...incomeDB[0],
        categories,
      });
    } else {
      const income = this.incomeRepository.create({
        ...incomeData,
        categories,
      });
      savedIncome = await this.incomeRepository.save(income);
    }

    return this.incomeRepository.findOne({
      where: { id: savedIncome.id },
      relations: ['categories', 'categories.entities'],
    });
  }

  async getIncomeById(id: number): Promise<IncomeModel> {
    const income = await this.incomeRepository.findOne({
      where: { id },
      relations: ['categories', 'categories.entities'],
    });
    return plainToInstance(IncomeModel, income);
  }

  async getIncomes(startDate: string, endDate: string): Promise<IncomeModel[]> {
    const startInitial = startOfDay(new Date('1970-01-01'));
    const endInitial = endOfDay(new Date('1970-01-01'));
    const start = startDate ? new Date(startDate) : startInitial;
    const end = endDate ? new Date(endDate) : endInitial;

    let incomes = await this.incomeRepository.find({
      where: {
        datum: Between(startOfDay(start), endOfDay(end)),
      },
      relations: ['categories', 'categories.entities'],
    });

    if (!incomes?.length) {
      //Call initial data.
      incomes = await this.incomeRepository.find({
        where: {
          datum: Between(startInitial, endInitial),
        },
        relations: ['categories', 'categories.entities'],
      });
    }

    return incomes.map((income) => plainToInstance(IncomeModel, income));
  }

  async getIncomesChats(
    startDate: string,
    endDate: string,
    period: 'day' | 'month' | 'year',
  ): Promise<IncomePeriodModel> {
    const startInitial = startOfDay(new Date('1970-01-01'));
    const endInitial = endOfDay(new Date('1970-01-01'));

    if (period === 'month') {
      const start = startDate
        ? startOfMonth(new Date(startDate))
        : startInitial;
      const end = endDate ? endOfMonth(new Date(endDate)) : endInitial;
      const incomes = await this.incomeRepository.find({
        where: {
          datum: Between(startOfDay(start), endOfDay(end)),
        },
        relations: ['categories', 'categories.entities'],
      });

      const incomeUpdated = incomes
        .map((income) => plainToInstance(IncomeModel, income))
        .sort(
          (a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime(),
        );

      console.log('incomesUpdate', incomeUpdated);
      const randomRGBA = (border?: string) => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = Math.random().toFixed(2); // Alpha between 0.00 and 1.00
        return `rgba(${r}, ${g}, ${b}, ${border ? a : 1})`;
      };

      const result: IncomePeriodModel = {
        labels: [],
        datasets: [],
      };

      incomeUpdated.map((data) => {
        let sumResult = 0;
        const dayOfMonth = getDate(new Date(data.datum));
        result.labels.push(dayOfMonth.toString());

        data.categories.forEach((category) => {
          sumResult += category.entities.reduce((acc, cur) => acc + cur.sum, 0);
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

      console.log('result', result);

      // incomeChats = {
      //   labels: ['John', 'Jane', 'Doe'],
      //   datasets: [
      //     {
      //       data: [34, 64, 23],
      //       backgroundColor: [
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //         'rgba(255, 205, 86, 0.2)',
      //       ],
      //       borderColor: [
      //         'rgb(255, 99, 132)',
      //         'rgb(255, 159, 64)',
      //         'rgb(255, 205, 86)',
      //       ],
      //       borderWidth: 1,
      //     },
      //   ],
      // };

      return result;
    } else if (period === 'year') {
    }
  }
}
