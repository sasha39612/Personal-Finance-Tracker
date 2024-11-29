import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TechnologyModel } from './models/technology.model';
import { TechnologyService } from './technology.service';

@Resolver(() => TechnologyModel)
export class TechnologyResolver {
  constructor(private technologyService: TechnologyService) {}

  @Query(() => TechnologyModel, { nullable: true })
  async technologyById(@Args('id', { type: () => Int }) id: number) {
    const data = await this.technologyService.getTechnologyById(id);
    return data;
  }
  @Query(() => [TechnologyModel])
  async technologies() {
    return this.technologyService.getAllTechnologies();
  }

  @Mutation(() => TechnologyModel)
  async createTechnology(
    @Args('title') title: string,
    @Args('tag') tag: string,
  ) {
    const technology = await this.technologyService.createTechnology(
      title,
      tag,
    );

    return {
      ...technology,
      fullTitle: `${technology.tag}: ${technology.title}`,
    };
  }

  @Mutation(() => TechnologyModel)
  async updateTechnology(
    @Args('id', { type: () => Int }) id: number,
    @Args('title', { nullable: true }) title: string,
    @Args('title', { nullable: true }) tag: string,
  ) {
    const technologyUpdated = {
      id,
      title,
      tag,
    };
    return this.technologyService.updateTechnology(technologyUpdated);
  }

  @Mutation(() => TechnologyModel)
  async deleteTechnology(@Args('id', { type: () => Int }) id: number) {
    return this.technologyService.deleteTechnology(id);
  }
}
