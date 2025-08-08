import { Field, InputType } from '@nestjs/graphql';
import { CategoryInput } from './category.input';

@InputType()
export class IncomeInput {
  @Field()
  datum: Date;

  @Field(() => [CategoryInput])
  categories: CategoryInput[];
}
