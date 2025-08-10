import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DatasetsIncomeModel {
  @Field(() => [Number])
  data: number[];

  @Field(() => [String])
  backgroundColor: string[];

  @Field(() => [String])
  borderColor: string[];

  @Field()
  borderWidth: number;
}
