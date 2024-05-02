import React from "react";
import { IconType } from "react-icons";
import { LoadingAnimation } from "../../ui";

interface FormButtonProps {
  label: string;
  type?: "button" | "submit" | "reset",
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  isLoading?: boolean;
}

export const FormButton = ({
  label,
  type = "button",
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  isLoading
}: FormButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative tracking-widest disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition w-full ${
        outline
          ? "bg-transparent border-accent/75 text-accent "
          : "bg-accent/75 border-accent/75 text-light "
      } ${
        outline && !(disabled || isLoading) && 'hover:bg-accent hover:border-accent hover:text-white'
      } ${
        !outline && !(disabled || isLoading) && 'hover:bg-accent hover:border-accent hover:text-white'
      }
      ${
        small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold"
      } ${
        !small && outline && "border-2"
      }
      `}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      { label }
      { isLoading && (
        <LoadingAnimation width={64} height={64} className="absolute right-4 -top-2" />
      )}
    </button>
  );
};

export default FormButton;
