export interface Entities {
  id: string;
  description: string;
  tooltip: string;
  sum: number;
}

export interface Category {
  id: number;
  title: string;
  entities: Array<Entities>;
}

export interface Incomes {
  datum: Date;
  categories: Array<Category>;
}

export type EntitiesInput = Omit<Entities, 'id'>

export interface CategoryInput {
  title: string;
  entities: Array<EntitiesInput>;
}

export interface IncomesInput extends Omit<Incomes, 'categories'> {
  datum: Date;
  categories: Array<CategoryInput>;
}
