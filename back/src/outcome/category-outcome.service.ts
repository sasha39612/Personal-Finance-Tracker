import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryOutcome } from './entities/categories-outcome.entity';
import { EntitiesOutcome } from './entities/entities-outcome.entity';
import { In, Repository } from 'typeorm';
import { CategoryOutcomeModel } from './models/category-outcome.model';

@Injectable()
export class CategoryOutcomeService {
  constructor(
    @InjectRepository(CategoryOutcome)
    private categoryOutcomeRepository: Repository<CategoryOutcome>,
    @InjectRepository(EntitiesOutcome)
    private entitiesOutcomeRepository: Repository<EntitiesOutcome>,
  ) {}

  async createCategory(title: string): Promise<CategoryOutcome> {
    return this.categoryOutcomeRepository.save({
      title,
    });
  }

  async getCategoryById(id: number): Promise<CategoryOutcomeModel> {
    return await this.categoryOutcomeRepository.findOne({
      where: { id },
      relations: ['entities_outcomes'],
    });
  }

  async getCategories(): Promise<CategoryOutcomeModel[]> {
    return await this.categoryOutcomeRepository.find({
      relations: ['entities_outcomes'],
    });
  }

  async deleteCategory(id: number): Promise<number> {
    await this.categoryOutcomeRepository.delete(id);
    return id;
  }

  async addCategoryEntity(
    categoryId: number,
    entityIds: number[],
  ): Promise<EntitiesOutcome[]> {
    const categoryOutcome = await this.categoryOutcomeRepository.findOne({
      where: { id: categoryId },
      relations: ['entities_outcomes'],
    });
    const entitiesOutcome = await this.entitiesOutcomeRepository.find({
      where: { id: In(entityIds) },
    });

    categoryOutcome.entities_outcome = [
      ...categoryOutcome.entities_outcome,
      ...entitiesOutcome,
    ];
    await this.categoryOutcomeRepository.save(categoryOutcome);

    return entitiesOutcome;
  }

  async deleteCategoryEntities(
    categoryId: number,
    entityIds: number[],
  ): Promise<number[]> {
    const categoryOutcome = await this.categoryOutcomeRepository.findOne({
      where: { id: categoryId },
      relations: ['entities_outcomes'],
    });

    categoryOutcome.entities_outcome = categoryOutcome.entities_outcome.filter(
      (i) => !entityIds.includes(i.id),
    );

    await this.categoryOutcomeRepository.save(categoryOutcome);

    return entityIds;
  }
}
