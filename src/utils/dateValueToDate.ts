import { DateValue } from "@nextui-org/react";

export const dateValueToDate = (dateVal: DateValue) => {
  return new Date(`${dateVal.year}-${dateVal.month}-${dateVal.day}`);
};

export default dateValueToDate;