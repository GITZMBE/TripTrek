import { useEffect, useState } from "react";
import { getLoggedInUser } from "../storage";

export const useFormUpdateable = (formData: any) => {
  const user = getLoggedInUser();
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