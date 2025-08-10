import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EntitiesIncomeModel } from './models/entities-income.model';
import { EntitiesIncomeService } from './entities-income.service';

@Resolver(() => EntitiesIncomeModel)
export class EntitiesIncomeResolver {
  constructor(private EntitiesIncomeService: EntitiesIncomeService) {}

  @Query(() => EntitiesIncomeModel, { nullable: true })
  async entityById(@Args('id', { type: () => Int }) id: number) {
    const data = await this.EntitiesIncomeService.getEntityById(id);
    return data;
  }

  @Query(() => [EntitiesIncomeModel])
  async Entities() {
    return this.EntitiesIncomeService.getAllEntities();
  }

  @Mutation(() => EntitiesIncomeModel)
  async createEntity(
    @Args('description') description: string,
    @Args('tooltip') tooltip: string,
    @Args('sum') sum: number,
  ) {
    return await this.EntitiesIncomeService.createEntity(description, tooltip, sum);
  }

  @Mutation(() => EntitiesIncomeModel)
  async updateEntity(
    @Args('id', { type: () => Int }) id: number,
    @Args('description') description: string,
    @Args('tooltip') tooltip: string,
    @Args('sum', { nullable: true }) sum?: number,
  ) {
    const entity = {
      id,
      description,
      tooltip,
      sum,
    };
    return this.EntitiesIncomeService.updateEntity(entity);
  }

  @Mutation(() => EntitiesIncomeModel)
  async deleteEntity(@Args('id', { type: () => Int }) id: number) {
    return this.EntitiesIncomeService.deleteEntity(id);
  }
}
