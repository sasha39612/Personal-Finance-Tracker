import randomRGBA from "./get-color";
import { IncomeCharts, OutcomeChats, SavingChats } from "./types";

const getSavings = (income: IncomeCharts, outcome: OutcomeChats): SavingChats => {
  const incomeLabels = income?.labels || [];
  const outcomeLabels = outcome?.labels || [];
  let labels = Array.from(new Set([...incomeLabels, ...outcomeLabels])) as string[];
  if (labels.length > 1) {
    labels = labels.map(Number).sort((a, b) => a - b).map(String);
  };

  const savings: SavingChats = { labels, datasets: [{ data: [], backgroundColor: [], borderColor: [], borderWidth: 1 }] };
  labels.forEach((label) => {
    const incomeDatasetsIndex = income.labels.indexOf(label);
    const outcomeDatasetsIndex = outcome.labels.indexOf(label);
    const data =
      (Number(income.datasets?.[0]?.data[incomeDatasetsIndex]) || 0) -
      (Number(outcome.datasets?.[0]?.data[outcomeDatasetsIndex]) || 0);

    const backgroundColor = data > 0 ? income.datasets[0]?.backgroundColor?.[incomeDatasetsIndex] : outcome.datasets[0]?.backgroundColor?.[outcomeDatasetsIndex];
    const borderColor = data > 0 ? income.datasets[0]?.borderColor?.[incomeDatasetsIndex] : outcome.datasets[0]?.borderColor?.[outcomeDatasetsIndex];

    savings.datasets[0] = {
      data: [...savings.datasets?.[0]?.data, ...[data]],
      backgroundColor: [...savings.datasets?.[0]?.backgroundColor, ...[backgroundColor || randomRGBA()]],
      borderColor: [...savings.datasets?.[0]?.borderColor, ...[borderColor || randomRGBA('border')]],
      borderWidth: savings.datasets?.[0]?.borderWidth,
    };
  });

  return savings;
};

export default getSavings;
