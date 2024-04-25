'use client';

import React, { Dispatch, SetStateAction, useState } from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { DateValue, RangeValue } from '@nextui-org/react';
import { getLocalTimeZone, today } from "@internationalized/date";
import { IoClose } from "react-icons/io5";
import { BiSolidCalendar } from "react-icons/bi";

interface DatepickerProps {
  onChangeDate: SetStateAction<any>;
  dateRange: RangeValue<DateValue> | undefined;
  setNightCount: Dispatch<SetStateAction<number>>;
}

export const Datepicker = ({
  onChangeDate,
  dateRange,
  setNightCount
}: DatepickerProps) => {
  const [hasClosed, setHasClosed] = useState(false);
  const hasDate = dateRange?.start && dateRange?.end;
  const isValid = hasDate || !hasClosed;

  return (
    <div className="w-full">
      <DateRangePicker 
        label='Stay duration'
        aria-label="Stay duration"
        className='w-full bg-secondary text-light'
        onOpenChange={isOpen => !isOpen && setHasClosed(true)}
        isRequired
        selectorIcon={!hasDate && <BiSolidCalendar size={20} />}
        endContent={hasDate && <IoClose size={20} onClick={() => {onChangeDate({ start: undefined, end: undefined }); setNightCount(0)}} />}
        isInvalid={!isValid}
        errorMessage={ !isValid && 'Please select a valid stay duration.' }
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
