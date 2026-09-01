'use client'

import OutcomesForm from '@/components/outcomes/outcomesForm';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import { Suspense } from 'react';

const Outcomes = () => {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<>loading</>}>
        <OutcomesForm />
      </Suspense>
    </ApolloProvider>
  );
}

export default Outcomes;
