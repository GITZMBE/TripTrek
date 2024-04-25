'use client';

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { DateValue, RangeValue } from '@nextui-org/react';
import { getLocalTimeZone, today } from "@internationalized/date";
import { IoClose } from "react-icons/io5";
import { BiSolidCalendar } from "react-icons/bi";
import { Reservation } from "@prisma/client";
import { dateValueToDate } from "@/src/utils";

interface DatepickerProps {
  onChangeDate: SetStateAction<any>;
  dateRange: RangeValue<DateValue> | undefined;
  setNightCount: Dispatch<SetStateAction<number>>;
  reservations: Reservation[];
}

export const Datepicker = ({
  onChangeDate,
  dateRange,
  setNightCount,
  reservations
}: DatepickerProps) => {
  const [hasClosed, setHasClosed] = useState(false);
  
  const datesOverlap = () => {
    if (dateRange && dateRange.start && dateRange.end) {
      const start = dateValueToDate(dateRange.start);
      const end = dateValueToDate(dateRange.end);

      const isOverlapping = (res: Reservation) => {
        const resStart = new Date(res.startDate);
        const resEnd = new Date(res.endDate);
        return (start <= resEnd && start >= resStart) || (end <= resEnd && end >= resStart) || (start <= resStart && end >= resEnd);
      }

      const overlap = reservations.some((reservation) => isOverlapping(reservation));
      return overlap;
    }
    return false;
  };

  const noneBockedDates = (val: DateValue) => {
    const date = dateValueToDate(val);
      const isOverlapping = (res: Reservation) => {
        const resStart = new Date(res.startDate);
        const resEnd = new Date(res.endDate);
        return (date <= resEnd && date >= resStart) || date === resStart || date === resEnd;
      }

      const overlap = reservations.some((reservation) => isOverlapping(reservation));
      return overlap;
  };
  
  const isValid = useMemo(() => {
    const hasDate = dateRange?.start && dateRange?.end;
    const overlaps = datesOverlap();

    return (hasDate && !overlaps) || !hasClosed
  }, [dateRange]);

  return (
    <div className="w-full">
      <DateRangePicker 
        label='Stay duration'
        aria-label="Stay duration"
        className='w-full bg-secondary text-light'
        onOpenChange={isOpen => !isOpen && setHasClosed(true)}
        isRequired
        selectorIcon={!dateRange && <BiSolidCalendar size={20} />}
        endContent={dateRange && <IoClose size={20} onClick={() => {onChangeDate({ start: undefined, end: undefined }); setNightCount(0)}} />}
        isInvalid={!isValid}
        errorMessage={ !isValid && 'Please select a valid stay duration.' }
        isDateUnavailable={noneBockedDates}
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
