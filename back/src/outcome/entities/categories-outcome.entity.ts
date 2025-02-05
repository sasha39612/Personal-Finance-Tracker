import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntitiesOutcome } from './entities-outcome.entity';
import { Outcome } from './outcome.entity';

@Entity()
export class CategoryOutcome {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Outcome, (outcome) => outcome.categories_outcome, {
    onDelete: 'CASCADE',
  })
  outcome: Outcome;

  @OneToMany(
    () => EntitiesOutcome,
    (entity_outcome) => entity_outcome.category_outcome,
    {
      cascade: true,
    },
  )
  entities_outcome: EntitiesOutcome[];
}
