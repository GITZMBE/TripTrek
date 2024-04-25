import { useState } from "react";

export const useLoading = (defaultValue?: boolean) => {
  const [isLoading, setIsLoading] = useState(defaultValue || false);

  return { isLoading, setIsLoading };
};

export default useLoading;