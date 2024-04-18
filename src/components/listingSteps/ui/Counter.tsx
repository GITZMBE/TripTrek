import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {
  const onAdd = () => {
    onChange(value + 1);
  };

  const onReduce = () => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  };

  return (
    <div className='w-full flex justify-between gap-8'>
      <div className='flex flex-col'>
        <div className='text-light font-medium'>{title}</div>
        <div className='font-light text-grey'>{subtitle}</div>
      </div>
      <div className='flex items-center gap-4'>
        <div
          onClick={onReduce}
          className='w-10 h-10 rounded-full border-[1px] flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'
        >
          <AiOutlineMinus />
        </div>
        <div className='font-light text-xl text-grey'>{value}</div>
        <div
          onClick={onAdd}
          className='w-10 h-10 rounded-full border-[1px] flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
