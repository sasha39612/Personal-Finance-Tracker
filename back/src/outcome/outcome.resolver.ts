import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OutcomeModel } from './models/outcome.model';
import { OutcomeService } from './outcome.service';
import { OutcomeInput } from './dto/outcomes.input';
import { OutcomePeriodModel } from './models/outcome-period.model';

@Resolver(() => OutcomeModel)
export class OutcomeResolver {
  constructor(private outcomeService: OutcomeService) {}

  @Query(() => [OutcomeModel])
  async outcome(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<OutcomeModel[]> {
    return this.outcomeService.getOutcomes(startDate, endDate);
  }

   @Query(() => OutcomePeriodModel)
    async outcomeChats(
      @Args('startDate') startDate: string,
      @Args('endDate') endDate: string,
      @Args('period') period: 'day' | 'month' | 'year',
    ): Promise<OutcomePeriodModel> {
      return this.outcomeService.getOutcomesChats(startDate, endDate, period);
    }

  @Mutation(() => OutcomeModel)
  createOutcome(
    @Args('outcomeData') outcomeData: OutcomeInput,
  ): Promise<OutcomeModel> {
    return this.outcomeService.createOutcome(outcomeData);
  }
}
