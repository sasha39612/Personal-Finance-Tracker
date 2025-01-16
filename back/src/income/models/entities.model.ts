import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryModel } from './category.model';

@ObjectType()
export class EntitiesModel {
  @Field(() => Int)
  id: number;

  @Field()
  description: string;

  @Field()
  tooltip: string;

  @Field()
  sum: number;

  @Field(() => CategoryModel)
  category: CategoryModel;
}
