import { gql } from '@apollo/client'
import client from './apollo-client'
import { IncomeCharts, OutcomeCharts } from './types'

export const queryChartsIncomeRSCgql = gql`
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
`;

export async function queryChartsIncomeRSC(startDate: string, endDate: string, period: string): Promise<IncomeCharts> {
  const result = await client.query<{ incomeCharts: IncomeCharts }>({
    query: queryChartsIncomeRSCgql,
    variables: { startDate, endDate, period },
    context: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return result.data.incomeCharts;
}

export const queryChartsOutcomeRSCgql = gql`
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
`;

export async function queryChartsOutcomeRSC(startDate: string, endDate: string, period: string): Promise<OutcomeCharts> {
  const result = await client.query<{ outcomeCharts: OutcomeCharts }>({
    query: queryChartsOutcomeRSCgql,
    variables: { startDate, endDate, period },
    context: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return result.data.outcomeCharts;
}
