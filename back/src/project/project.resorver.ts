import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectModel } from './models/project.model';
import { ProjectService } from './project.service';
import { ProjectFilterInput } from './dto/project-filter.input';
import { ProjectType } from './entities/project-type.enum';
import { Project } from './entities/project.entities';
import { UpdateProject } from './models/update-project.models';
import { TechnologyModel } from './models/technology.model';

@Resolver(() => ProjectModel)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => [ProjectModel])
  async projects(
    @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('filter', { type: () => ProjectFilterInput, nullable: true })
    filter?: ProjectFilterInput,
  ) {
    return this.projectService.getProjects(offset, limit, filter);
  }

  @Mutation(() => ProjectModel)
  async createProject(
    @Args('name') name: string,
    @Args('overview') overview: string,
    @Args('description') description: string,
    @Args('projectType') projectType: ProjectType,
    @Args('isFinished') isFinished: boolean,
  ): Promise<Project> {
    return this.projectService.createProject(
      name,
      overview,
      description,
      projectType,
      isFinished,
    );
  }

  @Mutation(() => ProjectModel)
  async updateProject(
    @Args('id', { type: () => Int }) id: number,
    @Args('project') projectModel: UpdateProject,
  ): Promise<ProjectModel> {
    await this.projectService.updateProject(id, projectModel);
    return this.projectService.getProjectById(id);
  }

  @Mutation(() => Int)
  async deleteProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.deleteProject(id);
  }

  @Mutation(() => [TechnologyModel])
  async addProjectTechnologies(
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('technologyIds', { type: () => [Int] }) technologyIds: number[],
  ) {
    return this.projectService.addProjectTechnologies(projectId, technologyIds);
  }

  @Mutation(() => [TechnologyModel])
  async deleteProjectTechnologies(
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('technologyIds', { type: () => [Int] }) technologyIds: number[],
  ) {
    return this.projectService.deleteProjectTechnologies(
      projectId,
      technologyIds,
    );
  }
}
