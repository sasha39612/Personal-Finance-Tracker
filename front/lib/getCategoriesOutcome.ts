import { Outcomes } from "./types";

const getCategoriesOutcome = (originalData: Outcomes['categories_outcome']) => originalData.map(category => ({
    title: category.title,
    entities_outcome: category.entities_outcome.map(entity => ({
        description: entity.description,
        sum: entity.sum
    }))
}));

export default getCategoriesOutcome;
