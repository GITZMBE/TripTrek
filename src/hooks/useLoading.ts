import { useState } from "react";

/**
* Same as useErrorMessage. 
*/
export const useLoading = (defaultValue?: boolean) => {
  const [isLoading, setIsLoading] = useState(defaultValue || false);

  return { isLoading, setIsLoading };
};

export default useLoading;
