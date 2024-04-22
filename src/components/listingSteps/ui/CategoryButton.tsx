import React, { ComponentPropsWithoutRef } from 'react';
import { IconType } from 'react-icons';

interface CategoryButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: IconType;
  label: string;
  selected: boolean;
}

export const CategoryButton = ({ icon: Icon, label, selected, ...props }: CategoryButtonProps) => {
  return (
    <button {...props} type='button' className={`w-2/5 p-4 rounded-lg hover:text-light border-2 hover:border-light space-y-2 ${ selected ? 'text-light border-2 border-light' : 'text-grey border-grey' }`}>
      <Icon size={24} />
      <h2 className='text-left'>{ label }</h2>
    </button>
  )
}

export default CategoryButton;