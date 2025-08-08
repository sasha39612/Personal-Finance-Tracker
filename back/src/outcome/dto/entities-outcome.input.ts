import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EntityOutcomeInput {
  @Field()
  description: string;

  @Field({ nullable: true })
  sum?: number;
}
