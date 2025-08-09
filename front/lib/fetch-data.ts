import { gql } from '@apollo/client'
import client from './apollo-client'
import { Incomes, IncomesInput, IncomeChats, OutcomeChats } from './types'

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

// TODO: This is a temporary solution to avoid breaking changes in the frontend
// and to allow the frontend to work with the current backend implementation.
// Once the backend is updated, change incomeChats to outcomeChats after BE will be ready.
export const queryChatsOutcomeRSCgql = gql`
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

export async function queryChatsOutcomeRSC(startDate: string, endDate: string, period: string): Promise<OutcomeChats> {
  const result = await client.query<{ incomeChats: OutcomeChats }>({
    query: queryChatsOutcomeRSCgql,
    variables: { startDate, endDate, period },
    context: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return result.data.incomeChats;
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

  export async function queryRSC(startDate: string, endDate: string): Promise<Incomes> {
  const result = await client.query<{ income: Incomes }>({
    query: queryRSCgql,
    variables: { startDate, endDate },
      context: {
    headers: {
      'Content-Type': 'application/json',
    },
    },
  });

  return result.data.income;
}

export async function mutateRSC(incomeData: IncomesInput): Promise<Incomes | undefined> {
  const result = await client.mutate<{ createIncome: { success: boolean; message: string; income: Incomes } }>({
    mutation: gql`
      mutation Mutation($incomeData: IncomeInput!) {
        createIncome(incomeData: $incomeData) {
            datum
            categories {
              title
              entities {
                description
                tooltip
                sum
              }
            }
          }
        }
    `,
    variables: {
      incomeData,
    },
  });

   if (result.data?.createIncome.success) {
    return result.data.createIncome.income;
  } else {
    console.error('Error:', result.data?.createIncome.message);
    return undefined;
  }
}


