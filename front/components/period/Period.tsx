'use client'
import { useState } from 'react';
import DatePickerComp from '../datepicker/DatePickerComp';

const Period = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('day')

  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPeriod(e.target.value);
  };
  console.log('selectedPeriod', selectedPeriod)
  return (
    <div className='relative w-full h-full lg:col-span-1 lg:row-start-1 lg:row-end-1'>
      <DatePickerComp
        date={selectedDate}
        onDateChange={setSelectedDate}
      />
      <fieldset>
        <legend className="pt-6 text-sm/6 font-semibold text-gray-900">Choose period for total incomes/outcomes</legend>
        <p className="mt-1 text-sm/6 text-gray-600">The chat will be builded per:</p>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-x-3">
            <input
              defaultChecked
              id="period-day"
              name="period"
              type="radio"
              value='day'
              onChange={handlePeriodChange}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
            />
            <label htmlFor="period-day" className="block text-sm/6 font-medium text-gray-900">
              Day
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="period-month"
              name="period"
              type="radio"
              value='month'
              onChange={handlePeriodChange}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
            />
            <label htmlFor="period-month" className="block text-sm/6 font-medium text-gray-900">
              Month
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="period-year"
              name="period"
              type="radio"
              value='year'
              onChange={handlePeriodChange}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
            />
            <label htmlFor="period-year" className="block text-sm/6 font-medium text-gray-900">
              Year
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default Period
