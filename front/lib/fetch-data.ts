import { gql } from '@apollo/client'
import client from './apollo-client'
import { IncomeChats, OutcomeChats } from './types'

export const queryChatsIncomeRSCgql = gql`
  query IncomeChats($startDate: String!, $endDate: String!, $period: String!) {
    incomeChats(startDate: $startDate, endDate: $endDate, period: $period) {
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

export async function queryChatsIncomeRSC(startDate: string, endDate: string, period: string): Promise<IncomeChats> {
  const result = await client.query<{ incomeChats: IncomeChats }>({
    query: queryChatsIncomeRSCgql,
    variables: { startDate, endDate, period },
    context: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return result.data.incomeChats;
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

  export const queryRSCgql = gql`
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
