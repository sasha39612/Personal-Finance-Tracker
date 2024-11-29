import { Field, InputType } from '@nestjs/graphql';
import { ProjectType } from '../entities/project-type.enum';

@InputType()
export class UpdateProject {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  overview: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  projectType: ProjectType;

  @Field({ nullable: true })
  isFinished: boolean;
}
