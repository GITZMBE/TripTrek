import React, { Dispatch, SetStateAction, useEffect } from "react";
import Datepicker from "./Datepicker";
import { DateValue, RangeValue } from "@nextui-org/react";
import { differenceInCalendarDays } from "date-fns";
import { dateValueToDate } from "@/src/utils";

interface CalendarProps {
  price: number;
  nightCount: number;
  setNightCount: Dispatch<SetStateAction<number>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  onChangeDate: SetStateAction<any>;
  dateRange: RangeValue<DateValue> | undefined;
}

export const Calendar = ({
  price,
  nightCount,
  setNightCount,
  totalPrice,
  setTotalPrice,
  onChangeDate,
  dateRange,
}: CalendarProps) => {

  useEffect(() => {
    if (dateRange?.start && dateRange?.end) {
      const dayCount = differenceInCalendarDays(
        dateValueToDate(dateRange.end),
        dateValueToDate(dateRange.start)
      );

      setNightCount(dayCount);
      setTotalPrice(price * dayCount);
    } else {
      setNightCount(0);
      setTotalPrice(0);
    }
  }, [dateRange, price, nightCount]);

  return (
    <div className='w-full'>
      <h2 className='text-light'>Select Date Range</h2>
      <div className='bg-primary rounded-xl border-[1xl] border-light overflow-hidden'>
        <div className='flex flex-col items-center gap-1 py-4'>
          <div className='w-full flex justify-between items-end text-start font-semibold space-x-2'>
            <div className='flex items-end gap-2'>
              <span className='text-2xl text-light'>$ {price}</span>
              <span className='font-light text-base text-grey'>/ night</span>
            </div>
            <div className='flex flex-col items-end gap-1'>
              <span className='text-grey'>$ { totalPrice }</span>
              { nightCount > 0 && (
                <div className="flex gap-2 text-secondary">
                  <span>{ nightCount }</span>
                  <span>{ nightCount === 1 ? 'night' : 'nights' }</span>
                </div>                
              )}
            </div>
          </div>
          <hr />
          <Datepicker onChangeDate={onChangeDate} dateRange={dateRange} setNightCount={setNightCount} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
