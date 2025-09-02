import { gql } from '@apollo/client'
import client from './apollo-client'
import { IncomeCharts, OutcomeChats } from './types'

export const queryChatsIncomeRSCgql = gql`
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

export async function queryChatsIncomeRSC(startDate: string, endDate: string, period: string): Promise<IncomeCharts> {
  const result = await client.query<{ incomeCharts: IncomeCharts }>({
    query: queryChatsIncomeRSCgql,
    variables: { startDate, endDate, period },
    context: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return result.data.incomeCharts;
}

export const queryChatsOutcomeRSCgql = gql`
  query OutcomeChats($startDate: String!, $endDate: String!, $period: String!) {
    outcomeChats(startDate: $startDate, endDate: $endDate, period: $period) {
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

export async function queryChatsOutcomeRSC(startDate: string, endDate: string, period: string): Promise<OutcomeChats> {
  const result = await client.query<{ outcomeChats: OutcomeChats }>({
    query: queryChatsOutcomeRSCgql,
    variables: { startDate, endDate, period },
    context: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return result.data.outcomeChats;
}
