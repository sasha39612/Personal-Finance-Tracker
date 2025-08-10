'use client'
import { useState, useEffect } from "react";
import DatePickerComp from "../datepicker/DatePickerComp";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Outcomes } from "@/lib/types";
import { startOfDay, endOfDay } from "date-fns";
import { getOutcomeCategories } from "@/lib/get-categories";

interface QueryResult {
  outcome: Outcomes[];
}

type FetchOutcomeFunction = (params: { variables: { startDate: string; endDate: string } }) => Promise<unknown>;

export const GET_OUTCOME = gql`
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

const CREATE_OUTCOME = gql`
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


const OutcomesForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formValues, setFormValues] = useState<Outcomes["categories_outcome"]>([]);
  const [fetchOutcome, { data: dataQuery, loading: loadingQuery, error: errorQuery }] = useLazyQuery<QueryResult>(
    GET_OUTCOME
  );
  const [createOutcome, { loading: loadingMutation, error: errorMutation }] = useMutation(CREATE_OUTCOME);

  const getData = (fetchOutcome: FetchOutcomeFunction, selectedDate: Date) =>
    fetchOutcome({
      variables: {
        startDate: startOfDay(selectedDate).toISOString(),
        endDate: endOfDay(selectedDate).toISOString(),
      },
    });

  const handleClick = () => {
    getData(fetchOutcome, selectedDate);
  };

  useEffect(() => {
    if (dataQuery?.outcome?.length) {
      setFormValues(dataQuery.outcome[0].categories_outcome ?? []);
    }
  }, [dataQuery]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, outComeId: number, entityId: number) => {
    const newValue = Number(e.target.value);

    setFormValues((prevValues) =>
      prevValues.map((outcome) => ({
        ...outcome,
        entities_outcome: outcome.entities_outcome.map((entity) =>
          entity.id === entityId ? { ...entity, sum: newValue } : entity
        ),
      }))
    );
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const categories_outcome = getOutcomeCategories(formValues);
    try {
      const response = await createOutcome({
        variables: {
          outcomeData: {
            datum: selectedDate.toISOString(),
            categories_outcome: categories_outcome,
          }
        }
      });

      const resultDatum = response.data.createOutcome.datum;
      const resultCategories = response.data.createOutcome.categories_outcome;
      if (resultDatum) {
        setSelectedDate(new Date(resultDatum));
      }
      if (resultCategories) {
        setFormValues(resultCategories);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  return (
    <form className="ml-4" onSubmit={handleOnSubmit}>
      <div className="space-y-4">
        <h1 className="mt-4 text-3xl font-semibold text-gray-900">Outcomes</h1>
        <p className="-mt-24 text-xl text-gray-600">
          This information will be saved to your outcomes.
        </p>
        <div className="mt-6 flex items-center justify-start gap-x-6 mr-3">
          <DatePickerComp
            date={selectedDate}
            onDateChange={setSelectedDate}
          />
          <button
            type="button"
            onClick={handleClick}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loadingQuery || loadingMutation ? "Loading..." : "Get data"}
          </button>
        </div>
        {(errorQuery || errorMutation) && <p className="text-red-500">Error loading data!</p>}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 mr-2 list-none">
          {formValues?.length > 0 ? formValues.map((outcomeItem) => (
            <li key={outcomeItem.id} className="mt-4">
              <p className="border-b border-gray-900/10 -ml-4 mb-4" />
              <h2 className="text-lg font-medium text-gray-900 ">{outcomeItem.title}</h2>
              <ul>
                {Array.isArray(outcomeItem.entities_outcome) ? outcomeItem.entities_outcome.map((subOutcomeItem) => (
                  <li key={subOutcomeItem.id} className="mt-2 flex items-baseline">
                    <div className="mt-2">
                      <input
                        id={subOutcomeItem.id.toString()}
                        name={subOutcomeItem.description}
                        type="number"
                        value={subOutcomeItem.sum}
                        onChange={(e) => handleOnChange(e, outcomeItem.id, subOutcomeItem.id)}
                        placeholder={subOutcomeItem.sum.toString()}
                        className="block w-36 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <label htmlFor={subOutcomeItem.id.toString()} className="block text-base lg:text-lg ml-3">
                      {`-  ${subOutcomeItem.description}`}
                    </label>
                  </li>
                ))
                  : <p>No outcome data available.</p>}
              </ul>
            </li>
          ))
            : <p>No outcome data available.</p>}
        </ul>
      </div>

      <p className="border-b border-gray-900/10 -ml-4 mt-4" />
      <div className="mt-6 flex items-center justify-end gap-x-6 mr-3">
        <button type="button" onClick={handleClick} className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default OutcomesForm
