import { useState } from "react";

/**
* This seems a bit pointless as the errorMessage state has the same lifecycle as the component it is invoked in. Why not use a local variable?
*/
export const useErrorMessage = (defaultValue?: string | null) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(defaultValue || null);
  return { errorMessage, setErrorMessage };
};

export default useErrorMessage;
