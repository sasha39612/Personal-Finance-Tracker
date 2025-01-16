import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { In, Repository } from 'typeorm';
import { Category } from './entities/categories.entity';
import { IncomeModel } from './models/income.model';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private IncomeRepository: Repository<Income>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createIncome(datum: Date): Promise<Income> {
    return this.IncomeRepository.save({
      datum,
    });
  }

  async getIncomeById(id: number): Promise<IncomeModel> {
    return await this.IncomeRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
  }

  async getIncomes(): Promise<IncomeModel[]> {
    return await this.IncomeRepository.find({
      relations: ['categories'],
    });
  }

  async deleteIncome(id: number): Promise<number> {
    await this.IncomeRepository.delete(id);
    return id;
  }

  async addIncomeCategory(
    incomeId: number,
    categoryIds: number[],
  ): Promise<Category[]> {
    const income = await this.IncomeRepository.findOne({
      where: { id: incomeId },
      relations: ['categories'],
    });
    const categories = await this.categoryRepository.find({
      where: { id: In(categoryIds) },
    });

    income.categories = [...income.categories, ...categories];
    await this.IncomeRepository.save(income);

    return categories;
  }

  async deleteIncomeCategories(
    incomeId: number,
    categoryIds: number[],
  ): Promise<number[]> {
    const income = await this.IncomeRepository.findOne({
      where: { id: incomeId },
      relations: ['categories'],
    });

    income.categories = income.categories.filter(
      (i) => !categoryIds.includes(i.id),
    );

    await this.IncomeRepository.save(income);

    return categoryIds;
  }
}
