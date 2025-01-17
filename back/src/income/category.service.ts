import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { Entities } from './entities/entities.entity';
import { In, Repository } from 'typeorm';
import { CategoryModel } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Entities)
    private entitiesRepository: Repository<Entities>,
  ) {}

  async createCategory(title: string): Promise<Category> {
    return this.categoryRepository.save({
      title,
    });
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['entities'],
    });
  }

  async getCategories(): Promise<CategoryModel[]> {
    return await this.categoryRepository.find({
      relations: ['entities'],
    });
  }

  async deleteCategory(id: number): Promise<number> {
    await this.categoryRepository.delete(id);
    return id;
  }

  async addCategoryEntity(
    categoryId: number,
    entityIds: number[],
  ): Promise<Entities[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['entities'],
    });
    const entities = await this.entitiesRepository.find({
      where: { id: In(entityIds) },
    });

    category.entities = [...category.entities, ...entities];
    await this.categoryRepository.save(category);

    return entities;
  }

  async deleteCategoryEntities(
    categoryId: number,
    entityIds: number[],
  ): Promise<number[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['entities'],
    });

    category.entities = category.entities.filter(
      (i) => !entityIds.includes(i.id),
    );

    await this.categoryRepository.save(category);

    return entityIds;
  }
}
