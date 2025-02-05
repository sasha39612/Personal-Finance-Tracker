export interface Entities {
  id: number;
  description: string;
  tooltip: string;
  sum: number;
}

export type EntitiesOutcome = Omit<Entities, 'tooltip'>;

export interface Category {
  id: number;
  title: string;
  entities: Array<Entities>;
}

export interface CategoryOutcome extends Omit<Category, 'entities'>{
  entities_outcome: Array<EntitiesOutcome>;
}

export interface Incomes {
  datum: Date;
  categories: Array<Category>;
}

export interface Outcomes {
  datum: Date;
  categories_outcome: Array<CategoryOutcome>;
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
