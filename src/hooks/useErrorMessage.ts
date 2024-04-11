import { useState } from "react";

export const useErrorMessage = () => {
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
  return { errorMessage, setErrorMessage };
};

export default useErrorMessage;