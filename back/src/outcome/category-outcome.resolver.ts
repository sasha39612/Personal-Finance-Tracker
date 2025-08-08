import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryOutcomeModel } from './models/category-outcome.model';
import { CategoryOutcome } from './entities/categories-outcome.entity';
import { EntitiesOutcomeModel } from './models/entities-outcome.model';
import { CategoryOutcomeService } from './category-outcome.service';

@Resolver(() => CategoryOutcomeModel)
export class CategoryOutcomeResolver {
  constructor(private categoryService: CategoryOutcomeService) {}

  @Query(() => [CategoryOutcomeModel])
  async categories() {
    return this.categoryService.getCategories();
  }

  @Mutation(() => CategoryOutcomeModel)
  async createCategory(@Args('title') title: string): Promise<CategoryOutcome> {
    return this.categoryService.createCategory(title);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Mutation(() => [EntitiesOutcomeModel])
  async addCategoryEntities(
    @Args('categoryId', { type: () => Int })
    categoryId: number,
    @Args('entityIds', { type: () => [Int] })
    entityIds: number[],
  ) {
    return this.categoryService.addCategoryEntity(categoryId, entityIds);
  }

  @Mutation(() => [EntitiesOutcomeModel])
  async deleteCategoryEntities(
    @Args('categoryId', { type: () => Int })
    categoryId: number,
    @Args('entityIds', { type: () => [Int] })
    entityIds: number[],
  ) {
    return this.categoryService.deleteCategoryEntities(categoryId, entityIds);
  }
}
