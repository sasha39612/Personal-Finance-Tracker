export interface Datasets {
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

export interface Entities {
  id: number;
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

export interface IncomeChats {
  labels: [string];
  datasets: Array<Datasets>;
}

export interface OutcomeChats {
  labels: [string];
  datasets: Array<Datasets>;
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
