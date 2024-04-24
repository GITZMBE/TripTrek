import React, { SetStateAction } from "react";
import Datepicker from "./Datepicker";
import { DateValue, RangeValue } from "@nextui-org/react";

interface CalendarProps {
  price: number;
  totalPrice: number;
  onChangeDate: SetStateAction<any>;
  dateRange: RangeValue<DateValue>;
}

export const Calendar = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
}: CalendarProps) => {
  return (
    <div className="w-full">
      <h2 className='text-light'>Select Date Range</h2>
      <div className='bg-primary rounded-xl border-[1xl] border-light overflow-hidden'>
        <div className='flex flex-col items-center gap-1 py-4'>
          <div className='w-full flex justify-between items-end text-start font-semibold space-x-2'>
            <div className="flex items-end gap-2">
              <span className='text-2xl text-light'>$ {price}</span>
              <span className='font-light text-base text-grey'>/ night</span>              
            </div>
            <span className="text-grey">$ { totalPrice }</span>
          </div>
          <hr />
          <Datepicker
            onChangeDate={onChangeDate}
            dateRange={dateRange}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
