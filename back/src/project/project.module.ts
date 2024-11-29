import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Technology } from './entities/technology.entity';
import { ProjectResolver } from './project.resorver';
import { ProjectService } from './project.service';
import { TechnologyResolver } from './technology.resorver';
import { TechnologyService } from './technology.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Technology])],
  providers: [
    ProjectResolver,
    ProjectService,
    TechnologyResolver,
    TechnologyService,
  ],
  exports: [TypeOrmModule, ProjectService],
})
export class ProjectModule {}
