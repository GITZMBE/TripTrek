import React, { SetStateAction } from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { DateValue, RangeValue } from '@nextui-org/react';
import { getLocalTimeZone, today } from "@internationalized/date";

interface DatepickerProps {
  onChangeDate: SetStateAction<any>;
  dateRange: RangeValue<DateValue>;
}

export const Datepicker = ({
  onChangeDate,
  dateRange,
}: DatepickerProps) => {
  return (
    <div className="w-full">
      <DateRangePicker 
        label='Stay duration'
        aria-label="Stay duration"
        className='w-full'
        minValue={today(getLocalTimeZone())}
        maxValue={today(getLocalTimeZone()).add({years: 1})}
        defaultValue={dateRange}
        value={dateRange}
        onChange={onChangeDate}
      />      
    </div>

  );
};

export default Datepicker;
