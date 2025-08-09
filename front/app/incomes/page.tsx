
'use client'

import IncomesForm from '@/components/incomes/incomesForm';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import { Suspense } from 'react';

const Incomes = () => {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<>loading</>}>
        <IncomesForm />
      </Suspense>
    </ApolloProvider>
  );
}

export default Incomes;
