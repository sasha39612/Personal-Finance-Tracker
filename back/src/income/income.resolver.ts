import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryModel } from './models/category.model';
import { IncomeModel } from './models/income.model';
import { IncomeService } from './income.service';
import { Income } from './entities/income.entity';

@Resolver(() => IncomeModel)
export class IncomeResolver {
  constructor(private incomeService: IncomeService) {}

  @Query(() => [IncomeModel])
  async income() {
    return this.incomeService.getIncomes();
  }

  @Mutation(() => IncomeModel)
  async createIncome(@Args('datum') datum: Date): Promise<Income> {
    return this.incomeService.createIncome(datum);
  }

  @Mutation(() => String)
  async deleteIncome(@Args('id', { type: () => Int }) id: number) {
    return this.incomeService.deleteIncome(id);
  }

  @Mutation(() => [CategoryModel])
  async addIncomeCategory(
    @Args('incomeId', { type: () => Int })
    incomeId: number,
    @Args('categoryIds', { type: () => [Int] })
    categoryIds: number[],
  ) {
    return this.incomeService.addIncomeCategory(incomeId, categoryIds);
  }

  @Mutation(() => [CategoryModel])
  async deleteIncomeCategories(
    @Args('incomeId', { type: () => Int })
    incomeId: number,
    @Args('CategoriesIds', { type: () => [Int] })
    CategoriesIds: number[],
  ) {
    return this.incomeService.deleteIncomeCategories(incomeId, CategoriesIds);
  }
}
