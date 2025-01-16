import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EntitiesModel } from './models/entities.model';
import { EntitiesService } from './entities.service';

@Resolver(() => EntitiesModel)
export class EntitiesResolver {
  constructor(private entitiesService: EntitiesService) {}

  @Query(() => EntitiesModel, { nullable: true })
  async entityById(@Args('id', { type: () => Int }) id: number) {
    const data = await this.entitiesService.getEntityById(id);
    return data;
  }

  @Query(() => [EntitiesModel])
  async Entities() {
    return this.entitiesService.getAllEntities();
  }

  @Mutation(() => EntitiesModel)
  async createEntity(
    @Args('description') description: string,
    @Args('tooltip') tooltip: string,
    @Args('sum') sum: number,
  ) {
    return await this.entitiesService.createEntity(description, tooltip, sum);
  }

  @Mutation(() => EntitiesModel)
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
    return this.entitiesService.updateEntity(entity);
  }

  @Mutation(() => EntitiesModel)
  async deleteEntity(@Args('id', { type: () => Int }) id: number) {
    return this.entitiesService.deleteEntity(id);
  }
}
