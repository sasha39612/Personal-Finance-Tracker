import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

const DatePickerComp = ({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: Dispatch<SetStateAction<Date>>;
}) => {
  const handleDateChange = (selectedDate: Date | null) => {
    onDateChange(selectedDate || new Date());
  };

  return (
    <div>
      <DatePicker
        dateFormat="dd-MM-yyyy"
        selected={date}
        onChange={handleDateChange}
        className="bg-white appearance-none px-2 py-2 rounded-lg shadow border-black text-black max-w-[144px]"
      />
    </div>
  );
};

export default DatePickerComp;
