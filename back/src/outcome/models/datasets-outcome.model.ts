import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DatasetsOutcomeModel {
  @Field(() => [Number])
  data: number[];

  @Field(() => [String])
  backgroundColor: string[];

  @Field(() => [String])
  borderColor: string[];

  @Field()
  borderWidth: number;
}
