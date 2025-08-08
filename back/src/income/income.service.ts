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
  startOfYear,
  endOfYear,
  endOfMonth,
  getDate,
  getMonth,
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
    try {
      const income = await this.incomeRepository.findOne({
      where: { id },
      relations: ['categories', 'categories.entities'],
    });
    return plainToInstance(IncomeModel, income);
  } catch (error) {
      console.error('Error fetching income by ID:', error);
      throw new Error('Income not found');
    }
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

    const incomes = await this.incomeRepository.find({
      where: {
        datum: Between(startOfDay(startPeriod), endOfDay(endPeriod)),
      },
      relations: ['categories', 'categories.entities'],
    });

    const incomeUpdated = incomes
      .map((income) => plainToInstance(IncomeModel, income))
      .sort(
        (a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime(),
    );

    const result: IncomePeriodModel = {
      labels: [],
      datasets: [],
    };

    if (period === 'year') {
      // Group incomes by month
      const monthlySums: { [month: string]: number } = {};
      incomeUpdated.forEach((data) => {
        const monthKey = new Date(data.datum).getFullYear() + '-' + (getMonth(new Date(data.datum)) + 1).toString().padStart(2, '0');
        let sumResult = 0;
        data.categories.forEach((category) => {
          sumResult += category.entities.reduce((acc, cur) => acc + cur.sum, 0);
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
        // Use first day of month for label
        const firstDayOfMonth = new Date(monthKey + '-01').toISOString().split('T')[0];
        result.labels.push(firstDayOfMonth);
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

    return result;
  }
}
