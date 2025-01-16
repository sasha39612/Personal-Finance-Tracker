import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IncomeModel } from './income.model';
import { EntitiesModel } from './entities.model';

@ObjectType()
export class CategoryModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => IncomeModel)
  income: IncomeModel;

  @Field(() => [EntitiesModel])
  entities: EntitiesModel[];
}
