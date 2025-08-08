import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EntitiesOutcomeModel } from './models/entities-outcome.model';
import { EntitiesOutcomeService } from './entities-outcome.service';

@Resolver(() => EntitiesOutcomeModel)
export class EntitiesOutcomeResolver {
  constructor(private entitiesOutcomeService: EntitiesOutcomeService) {}

  @Query(() => EntitiesOutcomeModel, { nullable: true })
  async entityById(@Args('id', { type: () => Int }) id: number) {
    const data = await this.entitiesOutcomeService.getEntityOutcomeById(id);
    return data;
  }

  @Query(() => [EntitiesOutcomeModel])
  async Entities() {
    return this.entitiesOutcomeService.getAllEntitiesOutcome();
  }

  @Mutation(() => EntitiesOutcomeModel)
  async createEntityOutcome(
    @Args('description') description: string,
    @Args('sum') sum: number,
  ) {
    return await this.entitiesOutcomeService.createEntityOutcome(
      description,
      sum,
    );
  }

  @Mutation(() => EntitiesOutcomeModel)
  async updateEntity(
    @Args('id', { type: () => Int }) id: number,
    @Args('description') description: string,
    @Args('sum', { nullable: true }) sum?: number,
  ) {
    const entity = {
      id,
      description,
      sum,
    };
    return this.entitiesOutcomeService.updateEntityOutcome(entity);
  }

  @Mutation(() => EntitiesOutcomeModel)
  async deleteEntity(@Args('id', { type: () => Int }) id: number) {
    return this.entitiesOutcomeService.deleteEntityOutcome(id);
  }
}
