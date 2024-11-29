import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectType } from './project-type.enum';
import { Technology } from './technology.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  overview: string;

  @Column()
  description: string;

  @Column()
  isFinished: boolean;

  @Column({
    type: 'enum',
    enum: ProjectType,
    default: ProjectType.INTERNAL,
  })
  projectType: ProjectType;

  @ManyToMany(() => Technology, (technology) => technology.projects)
  technologies: Technology[];
}
