import { Incomes, Outcomes } from "./types";

export const getIncomeCategories = (originalData: Incomes['categories']) => originalData.map(category => ({
    title: category.title,
    entities: category.entities.map(entity => ({
        description: entity.description,
        tooltip: entity.tooltip,
        sum: entity.sum
    }))
}));

export const getOutcomeCategories = (originalData: Outcomes['categories_outcome']) => originalData.map(category => ({
    title: category.title,
    entities_outcome: category.entities_outcome.map(entity => ({
        description: entity.description,
        sum: entity.sum
    }))
}));
