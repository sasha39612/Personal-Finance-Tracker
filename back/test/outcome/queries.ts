


// ------------------- Outcome -------------------
export const getOutcomes = `
  query Outcome($startDate: String!, $endDate: String!) {
    outcome(startDate: $startDate, endDate: $endDate) {
      id
      datum
      categories_outcome {
        id
        title
        entities_outcome {
          id
          description
          sum
        }
      }
    }
  }
`;

export const createOutcomeMutation = `
  mutation CreateOutcome($outcomeData: OutcomeInput!) {
    createOutcome(outcomeData: $outcomeData) {
      id
      datum
      categories_outcome {
        id
        title
        entities_outcome {
          id
          description
          sum
        }
      }
    }
  }
`;

// ------------------- OutcomesCharts -------------------
export const getOutcomesCharts = `
  query OutcomeCharts($startDate: String!, $endDate: String!, $period: String!) {
    outcomeCharts(startDate: $startDate, endDate: $endDate, period: $period) {
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
