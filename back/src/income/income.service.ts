import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Between, Repository } from 'typeorm';
import { IncomeModel } from './models/income.model';
import { plainToInstance } from 'class-transformer';
import { IncomeInput } from './dto/incomes.input';
import { startOfDay, endOfDay } from 'date-fns';

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
}
