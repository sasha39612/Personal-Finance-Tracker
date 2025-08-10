import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryIncomeModel } from './models/category-income.model';
import { Category } from './entities/categories.entity';
import { EntitiesIncomeModel } from './models/entities-income.model';
import { CategoryIncomeService } from './category-income.service';

@Resolver(() => CategoryIncomeModel)
export class CategoryIncomeResolver {
  constructor(private CategoryIncomeService: CategoryIncomeService) {}

  @Query(() => [CategoryIncomeModel])
  async categories() {
    return this.CategoryIncomeService.getCategories();
  }

  @Mutation(() => CategoryIncomeModel)
  async createCategory(@Args('title') title: string): Promise<Category> {
    return this.CategoryIncomeService.createCategory(title);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('id', { type: () => Int }) id: number) {
    return this.CategoryIncomeService.deleteCategory(id);
  }

  @Mutation(() => [EntitiesIncomeModel])
  async addCategoryEntities(
    @Args('categoryId', { type: () => Int })
    categoryId: number,
    @Args('entityIds', { type: () => [Int] })
    entityIds: number[],
  ) {
    return this.CategoryIncomeService.addCategoryEntity(categoryId, entityIds);
  }

  @Mutation(() => [EntitiesIncomeModel])
  async deleteCategoryEntities(
    @Args('categoryId', { type: () => Int })
    categoryId: number,
    @Args('entityIds', { type: () => [Int] })
    entityIds: number[],
  ) {
    return this.CategoryIncomeService.deleteCategoryEntities(categoryId, entityIds);
  }
}
