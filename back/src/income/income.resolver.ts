import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryModel } from './models/category.model';
import { IncomeModel } from './models/income.model';
import { IncomeService } from './income.service';
import { IncomeInput } from './dto/incomes.input';

@Resolver(() => IncomeModel)
export class IncomeResolver {
  constructor(private incomeService: IncomeService) {}

  @Query(() => [IncomeModel])
  async income(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<IncomeModel[]> {
    return this.incomeService.getIncomes(startDate, endDate);
  }

  @Query(() => IncomeModel)
  async incomeById(@Args('id', { type: () => Int }) id: number) {
    return await this.incomeService.getIncomeById(id);
  }

  @Mutation(() => IncomeModel)
  createIncome(
    @Args('incomeData') incomeData: IncomeInput,
  ): Promise<IncomeModel> {
    return this.incomeService.createIncome(incomeData);
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

  @Mutation(() => [Int])
  async deleteIncomeCategories(
    @Args('incomeId', { type: () => Int })
    incomeId: number,
    @Args('categoriesIds', { type: () => [Int] })
    categoriesIds: number[],
  ) {
    return this.incomeService.deleteIncomeCategories(incomeId, categoriesIds);
  }
}
