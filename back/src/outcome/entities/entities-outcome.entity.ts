import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryOutcome } from './categories-outcome.entity';

@Entity()
export class EntitiesOutcome {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  sum: number;

  @ManyToOne(
    () => CategoryOutcome,
    (category_outcome) => category_outcome.entities_outcome,
    {
      onDelete: 'CASCADE',
    },
  )
  category_outcome: CategoryOutcome;
}
