'use client'
import { useState } from "react";

export interface Entity {
  id: string;
  description: string;
  tooltip: string;
  sum: string;
  datum: string;
}

export interface Incomes {
  id: string;
  title: string;
  entities: Entity[],
}

const IncomesForm = ({ incomes }: { incomes: Incomes[] }) => {
  const [formValues, setFormValues] = useState(incomes);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, incomeId: string, entityId: string) => {
    const newValue = e.target.value;

    setFormValues((prevValues) =>
      prevValues.map((income) =>
        income.id === incomeId
          ? {
            ...income,
            entities: income.entities.map((entity) =>
              entity.id === entityId ? { ...entity, sum: newValue } : entity
            ),
          }
          : income
      )
    );
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
  }

  return (
    <form className="ml-4" onSubmit={handleOnSubmit}>
      <div className="space-y-4">
        <h1 className="mt-4 text-3xl font-semibold text-gray-900">Incomes</h1>
        <p className="-mt-24 text-xl text-gray-600">
          This information will be saved to your incomes.
        </p>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 list-none">
          {Array.isArray(formValues) ? formValues.map((incomeItem) => (
            <li key={incomeItem.id} className="mt-4">
              <p className="border-b border-gray-900/10 -ml-4 mb-4" />
              <h2 className="text-lg font-medium text-gray-900 ">{incomeItem.title}</h2>
              <ul>
                {Array.isArray(incomeItem.entities) ? incomeItem.entities.map((subIncomeItem) => (
                  <li key={subIncomeItem.id} className="relative group mt-2 flex items-baseline">
                    <div className="mt-2">
                      <input
                        id={subIncomeItem.id}
                        name={subIncomeItem.description}
                        type="number"
                        value={subIncomeItem.sum}
                        onChange={(e) => handleOnChange(e, incomeItem.id, subIncomeItem.id)}
                        placeholder={subIncomeItem.sum}
                        className="block w-36 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>

                    <label htmlFor={subIncomeItem.id} className="block text-base lg:text-lg ml-3">
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
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
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
