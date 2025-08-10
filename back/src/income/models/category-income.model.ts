import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EntitiesIncomeModel } from './entities-income.model';

@ObjectType()
export class CategoryIncomeModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => [EntitiesIncomeModel])
  entities: EntitiesIncomeModel[];
}
