import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EntityInput {
  @Field()
  description: string;

  @Field()
  tooltip: string;

  @Field({ nullable: true })
  sum?: number;
}
