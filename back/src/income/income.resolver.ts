import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => IncomeModel)
  createIncome(
    @Args('incomeData') incomeData: IncomeInput,
  ): Promise<IncomeModel> {
    return this.incomeService.createIncome(incomeData);
  }
}
