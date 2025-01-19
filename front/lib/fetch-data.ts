import { gql } from '@apollo/client'
import { getClient } from './apollo-client'
import { Incomes, IncomesInput } from './types'

export async function queryRSC(): Promise<Incomes> {
  const result = await getClient().query<{ income: Incomes }>({
    query: gql`
      query Income {
        income {
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
    `
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


