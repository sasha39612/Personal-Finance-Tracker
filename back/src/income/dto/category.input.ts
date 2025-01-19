import { Field, InputType } from '@nestjs/graphql';
import { EntityInput } from './entities.input';

@InputType()
export class CategoryInput {
  @Field()
  title: string;

  @Field(() => [EntityInput])
  entities: EntityInput[];
}
