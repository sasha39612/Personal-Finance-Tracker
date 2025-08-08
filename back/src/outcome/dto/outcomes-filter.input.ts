import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OutcomeFilterInput {
  @Field({ nullable: true })
  datum?: Date;
}
