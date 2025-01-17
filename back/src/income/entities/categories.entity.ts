import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Entities } from './entities.entity';
import { Income } from './income.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Income, (income) => income.categories, {
    onDelete: 'CASCADE',
  })
  income: Income;

  @OneToMany(() => Entities, (entity) => entity.category)
  entities: Entities[];
}
