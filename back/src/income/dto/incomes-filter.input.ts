import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IncomeFilterInput {
  @Field({ nullable: true })
  datum?: Date;
}
