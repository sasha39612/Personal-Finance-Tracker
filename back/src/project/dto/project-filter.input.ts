import { Field, InputType } from '@nestjs/graphql';
import { ProjectType } from '../entities/project-type.enum';

@InputType()
export class ProjectFilterInput {
  @Field({ nullable: true })
  isFinished?: boolean;

  @Field(() => ProjectType, { nullable: true })
  projectType?: ProjectType;
}
