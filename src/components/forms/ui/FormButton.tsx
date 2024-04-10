import React from "react";
import { IconType } from "react-icons";

interface FormButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export const FormButton = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: FormButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative tracking-widest disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition w-full ${
        outline
          ? "bg-transparent hover:bg-accent border-accent/75 hover:border-accent text-accent hover:text-white"
          : "bg-accent/75 border-accent/75 text-light hover:bg-accent hover:border-accent hover:text-white"
      } ${
        small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold"
      } ${!small && outline && "border-2"}`}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  );
};

export default FormButton;
