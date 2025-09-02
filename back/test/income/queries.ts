


// ------------------- Income -------------------
export const getIncomes = `
  query Income($startDate: String!, $endDate: String!) {
    income(startDate: $startDate, endDate: $endDate) {
      id
      datum
      categories {
        id
        title
        entities {
          id
          description
          tooltip
          sum
        }
      }
    }
  }
`;

export const createIncomeMutation = `
  mutation Mutation($incomeData: IncomeInput!) {
    createIncome(incomeData: $incomeData) {
      id
      datum
      categories {
        id
        title
        entities {
          id
          description
          tooltip
          sum
        }
      }
    }
  }
`;

// ------------------- IncomesCharts -------------------
export const getIncomesCharts = `
    query IncomeCharts($startDate: String!, $endDate: String!, $period: String!) {
        incomeCharts(startDate: $startDate, endDate: $endDate, period: $period) {
            labels
            datasets {
                data
                backgroundColor
                borderColor
                borderWidth
            }
        }
    }
`
