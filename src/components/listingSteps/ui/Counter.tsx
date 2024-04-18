import React from 'react'
import { AiOutlineMinus } from 'react-icons/ai';

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
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col'>
        <div className='font-medium'>
          <div className='font-light text-grey'>
            { subtitle }
          </div>          
        </div>
        <div className='flex items-center gap-4'>
          <div onClick={onReduce} className='w-10 h-10 rounded-full border-[1px] flex itmes-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'>
            <AiOutlineMinus size={16} />
          </div>
          <div className="font-light text-xl text-neutral-600">{ value }</div>
          <button onClick={onAdd} className='w-10 h-10 rounded-full border-[1px] flex itmes-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'>+</button>
        </div>
      </div>
    </div>
  )
}

export default Counter;