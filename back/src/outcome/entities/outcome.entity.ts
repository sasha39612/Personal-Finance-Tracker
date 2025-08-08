import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryOutcome } from './categories-outcome.entity';

@Entity()
export class Outcome {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  datum: Date;

  @OneToMany(
    () => CategoryOutcome,
    (CategoryOutcome) => CategoryOutcome.outcome,
    {
      cascade: true,
    },
  )
  categories_outcome: CategoryOutcome[];
}
