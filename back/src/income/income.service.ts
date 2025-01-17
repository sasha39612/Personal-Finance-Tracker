import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { In, Repository } from 'typeorm';
import { Category } from './entities/categories.entity';
import { IncomeModel } from './models/income.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createIncome(datum: Date): Promise<Income> {
    return this.incomeRepository.save({
      datum,
    });
  }

  async getIncomeById(id: number): Promise<IncomeModel> {
    const income = await this.incomeRepository.findOne({
      where: { id },
      relations: ['categories', 'categories.entities'],
    });
    return plainToInstance(IncomeModel, income);
  }

  async getIncomes(): Promise<IncomeModel[]> {
    const incomes = await this.incomeRepository.find({
      relations: ['categories', 'categories.entities'],
    });
    return incomes.map((income) => plainToInstance(IncomeModel, income));
  }

  async deleteIncome(id: number): Promise<number> {
    await this.incomeRepository.delete(id);
    return id;
  }

  async addIncomeCategory(
    incomeId: number,
    categoryIds: number[],
  ): Promise<Category[]> {
    const income = await this.incomeRepository.findOne({
      where: { id: incomeId },
      relations: ['categories'],
    });
    const categories = await this.categoryRepository.find({
      where: { id: In(categoryIds) },
    });

    income.categories = [...income.categories, ...categories];
    await this.incomeRepository.save(income);

    return categories;
  }

  async deleteIncomeCategories(
    incomeId: number,
    categoryIds: number[],
  ): Promise<number[]> {
    const income = await this.incomeRepository.findOne({
      where: { id: incomeId },
      relations: ['categories'],
    });

    income.categories = income.categories.filter(
      (i) => !categoryIds.includes(i.id),
    );

    await this.incomeRepository.save(income);

    return categoryIds;
  }
}
