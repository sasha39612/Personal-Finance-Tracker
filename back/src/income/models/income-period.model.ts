import { Field, ObjectType } from '@nestjs/graphql';
import { DatasetsIncomeModel } from './datasets-income.model';

@ObjectType()
export class IncomePeriodModel {
  @Field(() => [String])
  labels: string[];

  @Field(() => [DatasetsIncomeModel])
  datasets: DatasetsIncomeModel[];
}
