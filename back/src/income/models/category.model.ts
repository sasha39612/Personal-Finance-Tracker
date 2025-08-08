import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EntitiesModel } from './entities.model';

@ObjectType()
export class CategoryModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => [EntitiesModel])
  entities: EntitiesModel[];
}
