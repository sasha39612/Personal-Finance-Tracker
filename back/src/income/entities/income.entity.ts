import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './categories.entity';

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  datum: Date;

  @OneToMany(() => Category, (incomeCategory) => incomeCategory.income, {
    cascade: true,
  })
  categories: Category[];
}
