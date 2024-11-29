import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProjectType } from '../entities/project-type.enum';
import { TechnologyModel } from './technology.model';

@ObjectType()
export class ProjectModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  overview: string;

  @Field()
  description: string;

  @Field(() => ProjectType)
  projectType: ProjectType;

  @Field()
  isFinished: boolean;

  @Field(() => [TechnologyModel], { nullable: true })
  technologies?: TechnologyModel[];
}
