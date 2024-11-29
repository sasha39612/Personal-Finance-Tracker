import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TechnologyModel {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  tag: string;
}
