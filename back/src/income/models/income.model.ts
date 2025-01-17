import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryModel } from './category.model';

@ObjectType()
export class IncomeModel {
  @Field(() => Int)
  id: number;

  @Field()
  datum: Date;

  @Field(() => [CategoryModel])
  categories: CategoryModel[];
}
