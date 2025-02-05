import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryOutcomeModel } from './category-outcome.model';

@ObjectType()
export class OutcomeModel {
  @Field(() => Int)
  id: number;

  @Field()
  datum: Date;

  @Field(() => [CategoryOutcomeModel])
  categories_outcome: CategoryOutcomeModel[];
}
