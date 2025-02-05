import { Field, InputType } from '@nestjs/graphql';
import { CategoryOutcomeInput } from './category-outcome.input';

@InputType()
export class OutcomeInput {
  @Field()
  datum: Date;

  @Field(() => [CategoryOutcomeInput])
  categories_outcome: CategoryOutcomeInput[];
}
