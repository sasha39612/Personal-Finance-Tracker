'use client'
import { useEffect, useState } from "react";
import DatePickerComp from "../datepicker/DatePickerComp";
import { Incomes } from "@/lib/types";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { format, startOfDay, endOfDay } from "date-fns";
import getCategories from "@/lib/get-categories";

interface QueryResult {
  income: Incomes[];
}

type FetchIncomeFunction = (params: { variables: { startDate: string; endDate: string } }) => Promise<unknown>;

export const GET_INCOME = gql`
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

const CREATE_INCOME = gql`
  mutation CreateIncome($incomeData: IncomeInput!) {
    createIncome(incomeData: $incomeData) {
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

const getData = (fetchIncome: FetchIncomeFunction, selectedDate: Date) =>
  fetchIncome({
    variables: {
      startDate: format(startOfDay(selectedDate), "yyyy-MM-dd'T'00:00:00XXX"),
      endDate: format(endOfDay(selectedDate), "yyyy-MM-dd'T'23:59:59XXX"),
    },
  });

const IncomesForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formValues, setFormValues] = useState<Incomes["categories"]>([]);
  const [fetchIncome, { data: dataQuery, loading: loadingQuery, error: errorQuery }] = useLazyQuery<QueryResult>(
    GET_INCOME
  );
  const [createIncome, { loading: loadingMutation, error: errorMutation }] = useMutation(CREATE_INCOME);

  const getData = (fetchIncome: FetchIncomeFunction, selectedDate: Date) =>
    fetchIncome({
      variables: {
        startDate: startOfDay(selectedDate).toISOString(),
        endDate: endOfDay(selectedDate).toISOString(),
      },
    });

  const handleClick = () => {
    getData(fetchIncome, selectedDate);
    };

  useEffect(() => {
    if (dataQuery?.income?.length) {
      setFormValues(dataQuery.income[0].categories ?? []);
    }
  }, [dataQuery]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, incomeId: number, entityId: number) => {
    const newValue = Number(e.target.value);

    setFormValues((prevValues) =>
      prevValues.map((income) => ({
        ...income,
        entities: income.entities.map((entity) =>
          entity.id === entityId ? { ...entity, sum: newValue } : entity
        ),
      })
      )
    );
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const categories = getCategories(formValues);
    try {
      const response = await createIncome({
        variables: {
          incomeData: {
            datum: selectedDate.toISOString(),
            categories: categories,
          }
        }
      });

      const resultDatum = response.data.createIncome.datum;
      const resultCategories = response.data.createIncome.categories;
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
        <h1 className="mt-4 text-3xl font-semibold text-gray-900">Incomes</h1>
        <p className="-mt-24 text-xl text-gray-600">
          This information will be saved to your incomes.
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
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 list-none">
          {formValues?.length > 0 ? formValues.map((incomeItem) => (
            <li key={incomeItem.id} className="mt-4">
              <p className="border-b border-gray-900/10 -ml-4 mb-4" />
              <h2 className="text-lg font-medium text-gray-900 ">{incomeItem.title}</h2>
              <ul>
                {Array.isArray(incomeItem.entities) ? incomeItem.entities.map((subIncomeItem) => (
                  <li key={subIncomeItem.id} className="relative group mt-2 flex items-baseline">
                    <div className="mt-2">
                      <input
                        id={subIncomeItem.id.toString()}
                        name={subIncomeItem.description}
                        type="number"
                        value={subIncomeItem.sum}
                        onChange={(e) => handleOnChange(e, incomeItem.id, subIncomeItem.id)}
                        placeholder={subIncomeItem.sum.toString()}
                        className="block w-36 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>

                    <label htmlFor={subIncomeItem.id.toString()} className="block text-base lg:text-lg ml-3">
                      {`-  ${subIncomeItem.description}`}
                    </label>

                    <div className="absolute left-1 transform -translate-x-1 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                      {subIncomeItem.tooltip}
                    </div>

                  </li>
                ))
                  : <p>No income data available.</p>}
              </ul>
            </li>
          ))
            : <p>No income data available.</p>}
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

export default IncomesForm
