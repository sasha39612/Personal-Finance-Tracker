import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Technology } from './entities/technology.entity';
import { In, Repository } from 'typeorm';
import { ProjectType } from './entities/project-type.enum';
import { ProjectModel } from './models/project.model';
import { ProjectFilterInput } from './dto/project-filter.input';
import { UpdateProject } from './models/update-project.models';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {}

  async createProject(
    name: string,
    overview: string,
    description: string,
    projectType: ProjectType,
    isFinished: boolean,
  ): Promise<Project> {
    return this.projectRepository.save({
      name,
      overview,
      description,
      projectType,
      isFinished,
    });
  }

  async getProjectById(id: number): Promise<ProjectModel> {
    return await this.projectRepository.findOne({
      where: { id },
      relations: ['technologies'],
    });
  }

  async getProjects(
    offset: number,
    limit: number,
    { isFinished, projectType }: ProjectFilterInput = {},
  ): Promise<ProjectModel[]> {
    return await this.projectRepository.find({
      where: {
        ...(isFinished ? { isFinished } : {}),
        ...(ProjectType ? { projectType } : {}),
      },
      order: {
        id: 'ASC',
      },
      skip: offset,
      relations: ['technologies'],
      take: limit,
    });
  }

  async updateProject(id: number, project: UpdateProject) {
    await this.projectRepository.update(id, project);
    return this.projectRepository.findOneBy({ id });
  }

  async deleteProject(id: number): Promise<number> {
    await this.projectRepository.delete(id);
    return id;
  }

  async addProjectTechnologies(
    projectId: number,
    technologyIds: number[],
  ): Promise<Technology[]> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['technologies'],
    });
    const technologies = await this.technologyRepository.find({
      where: { id: In(technologyIds) },
    });

    project.technologies = [...project.technologies, ...technologies];
    await this.projectRepository.save(project);

    return technologies;
  }

  async deleteProjectTechnologies(
    projectId: number,
    technologyIds: number[],
  ): Promise<number[]> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['technologies'],
    });

    project.technologies = project.technologies.filter(
      (i) => !technologyIds.includes(i.id),
    );

    await this.projectRepository.save(project);

    return technologyIds;
  }
}
