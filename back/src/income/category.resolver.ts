import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryModel } from './models/category.model';
import { Category } from './entities/categories.entity';
import { EntitiesModel } from './models/entities.model';
import { CategoryService } from './category.service';

@Resolver(() => CategoryModel)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryModel])
  async categories() {
    return this.categoryService.getCategories();
  }

  @Mutation(() => CategoryModel)
  async createCategory(@Args('title') title: string): Promise<Category> {
    return this.categoryService.createCategory(title);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Mutation(() => [EntitiesModel])
  async addCategoryEntities(
    @Args('categoryId', { type: () => Int })
    categoryId: number,
    @Args('entityIds', { type: () => [Int] })
    entityIds: number[],
  ) {
    return this.categoryService.addCategoryEntity(categoryId, entityIds);
  }

  @Mutation(() => [EntitiesModel])
  async deleteCategoryEntities(
    @Args('categoryId', { type: () => Int })
    categoryId: number,
    @Args('entityIds', { type: () => [Int] })
    entityIds: number[],
  ) {
    return this.categoryService.deleteCategoryEntities(categoryId, entityIds);
  }
}
