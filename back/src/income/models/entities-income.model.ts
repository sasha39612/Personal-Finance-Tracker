import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EntitiesIncomeModel {
  @Field(() => Int)
  id: number;

  @Field()
  description: string;

  @Field()
  tooltip: string;

  @Field()
  sum: number;
}
