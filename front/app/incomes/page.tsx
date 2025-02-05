
import IncomesForm from '@/components/incomes/incomesForm';
import { PreloadQuery } from '@/lib/apollo-client';
import { Suspense } from 'react';
import { queryRSCgql } from '@/lib/fetch-data';

const Incomes = () => {
  return <PreloadQuery
    query={queryRSCgql}
    variables={{ "startDate": "2025-01-01", "endDate": "2025-01-31" }}
  >
    <Suspense fallback={<>loading</>}>
      <IncomesForm />
    </Suspense>
  </PreloadQuery>
}

export default Incomes;
