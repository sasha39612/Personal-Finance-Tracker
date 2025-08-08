import { Field, InputType } from '@nestjs/graphql';
import { EntityOutcomeInput } from './entities-outcome.input';

@InputType()
export class CategoryOutcomeInput {
  @Field()
  title: string;

  @Field(() => [EntityOutcomeInput])
  entities_outcome: EntityOutcomeInput[];
}
