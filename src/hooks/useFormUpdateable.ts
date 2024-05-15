import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";

/**
* Any? :(
*/
export const useFormUpdateable = (formData: any) => {
  const { currentUser: user } = useCurrentUser();
  const [updateable, setUpdateable] = useState(false);

  useEffect(() => {
    let samePassword = false;

    if (
      (formData.name !== user?.name && formData.name !== "") ||
      (formData.email !== user?.email && formData.email !== "") ||
      (!samePassword && formData.password !== "") ||
      (formData.avatar !== user?.avatar &&
        formData.avatar !== null &&
        formData.avatar !== "")
    ) {
      setUpdateable(true);
      return;
    }
    setUpdateable(false);
  }, []);

  return { updateable, setUpdateable };
};

export default useFormUpdateable;
