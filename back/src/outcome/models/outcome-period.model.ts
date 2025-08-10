import { Field, ObjectType } from '@nestjs/graphql';
import { DatasetsOutcomeModel } from './datasets-outcome.model'; 

@ObjectType()
export class OutcomePeriodModel {
  @Field(() => [String])
  labels: string[];

  @Field(() => [DatasetsOutcomeModel])
  datasets: DatasetsOutcomeModel[];
}
