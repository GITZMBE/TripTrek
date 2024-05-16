import { Category } from '@prisma/client';
import React, { ComponentPropsWithoutRef } from 'react';
import { Icon } from '../../ui';

interface CategoryButtonProps extends ComponentPropsWithoutRef<"button"> {
  category: Category;
  selected: boolean;
}

export const CategoryButton = ({ category, selected, ...props }: CategoryButtonProps) => {
  return (
    <button {...props} type='button' className={`group w-2/5 p-4 rounded-lg hover:text-light border-2 hover:border-light space-y-2 ${ selected ? 'text-light border-2 border-light' : 'text-grey border-grey' }`}>
      <Icon icon={category.type} className={`w-6 group-hover:text-light ${ selected && 'text-light' }`} size={24} />
      <h2 className='text-left'>{ category.type }</h2>
    </button>
  )
}

export default CategoryButton;