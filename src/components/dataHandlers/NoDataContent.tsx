import Link from "next/link";
import { Icontype } from "../ui";

interface NoDataContentProps {
  label: string;
  icon: string;
}

export const NoDataContent = ({
  label,
  icon,
}: NoDataContentProps) => {
  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <Icontype icon={icon} />
      <span className='text-2xl text-grey'>{label}</span>
      <Link href='/' className='text-secondary hover:text-light'>
        Clear filters
      </Link>
    </div>
  );
};

export default NoDataContent;