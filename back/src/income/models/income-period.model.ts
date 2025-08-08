import { Field, ObjectType } from '@nestjs/graphql';
import { DatasetsModel } from './datasets.model';

@ObjectType()
export class IncomePeriodModel {
  @Field(() => [String])
  labels: string[];

  @Field(() => [DatasetsModel])
  datasets: DatasetsModel[];
}
