import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { print } from 'graphql';
import {
  createProject,
  getProjectById,
  getProject,
  updateProject,
} from './queries';

import { Project } from 'src/project/entities/project.entity';
import { ProjectType } from 'src/project/entities/project-type.enum';
import dataSource from 'src/database/orm.config';

const projectsLength = 12;
const offsetCustom = 1;
const limitCustom = 4;
const projectsFilteredLength = 3;
const variablesCustom = {
  filter: {
    isFinished: true,
    projectType: 'GLOBAL',
  },
  offset: offsetCustom,
  limit: limitCustom,
};

const testProject: Project = {
  ...new Project(),
  name: 'TEST Project',
  description: 'Description Test',
  projectType: ProjectType.GLOBAL,
  overview: 'TEST overview',
  isFinished: true,
};

describe('ProjectResolver (e2e) tests)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const dataSource = app.get(DataSource);
    await dataSource.synchronize(true);
  });

  describe('ProjectResolver Queries', () => {
    const addCustomsProjects = async (projectsLength: number) => {
      for (let i = 0; i <= projectsLength; i++) {
        const testProjectCustom: Project = {
          ...testProject,
          projectType: !Number.isInteger(i / 3)
            ? ProjectType.GLOBAL
            : ProjectType.INTERNAL,
          isFinished: Number.isInteger(i / 2),
        };
        await addCustomsProjects(testProjectCustom);
      }
    };

    it('should return an empty array when no project exists', async () => {
      await clearDataBase();
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });

  const clearDataBase = async () => {
    const dataSource = app.get(DataSource);
    const repository = dataSource.getRepository(Project);
    await repository.delete({});
  };
});
