import { gql } from '@apollo/client'
import { getClient } from './apollo-client'
import { Incomes, IncomesInput } from './types'

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
  const result = await getClient().query<{ income: Incomes }>({
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
  const result = await getClient().mutate<{ createIncome: { success: boolean; message: string; income: Incomes } }>({
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


