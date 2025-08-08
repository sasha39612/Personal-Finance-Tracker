import { Incomes } from "./types";

const getCategories = (originalData: Incomes['categories']) => originalData.map(category => ({
    title: category.title,
    entities: category.entities.map(entity => ({
        description: entity.description,
        tooltip: entity.tooltip,
        sum: entity.sum
    }))
}));

export default getCategories;
