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

export interface EntitiesOutcome {
  id: number;
  description: string;
  sum: number;
}

export interface Category {
  id: number;
  title: string;
  entities: Array<Entities>;
}

export interface CategoryOutcome {
  id: number;
  title: string;
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

export interface IncomeCharts {
  labels: string[];
  datasets: Array<Datasets>;
}

export type SavingCharts = IncomeCharts

export interface OutcomeCharts {
  labels: string[];
  datasets: Array<Datasets>;
}

export type EntitiesInput = Omit<Entities, 'id'>

export interface CategoryInput {
  title: string;
  entities: Array<EntitiesInput>;
}
