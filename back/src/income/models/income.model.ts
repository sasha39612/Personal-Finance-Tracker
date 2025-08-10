import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryIncomeModel } from './category-income.model';

@ObjectType()
export class IncomeModel {
  @Field(() => Int)
  id: number;

  @Field()
  datum: Date;

  @Field(() => [CategoryIncomeModel])
  categories: CategoryIncomeModel[];
}
