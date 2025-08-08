import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EntitiesOutcomeModel {
  @Field(() => Int)
  id: number;

  @Field()
  description: string;

  @Field()
  sum: number;
}
