import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EntitiesOutcomeModel } from './entities-outcome.model';

@ObjectType()
export class CategoryOutcomeModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => [EntitiesOutcomeModel])
  entities_outcome: EntitiesOutcomeModel[];
}
