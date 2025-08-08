import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './categories.entity';

@Entity()
export class Entities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  tooltip: string;

  @Column()
  sum: number;

  @ManyToOne(() => Category, (category) => category.entities, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
