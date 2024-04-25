import { useState } from "react";

export const useErrorMessage = (defaultValue?: string) => {
  const [ errorMessage, setErrorMessage ] = useState<string | null>(defaultValue || null);
  return { errorMessage, setErrorMessage };
};

export default useErrorMessage;