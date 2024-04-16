import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../recoil";

export const useFormUpdateable = (formData: any) => {
  const user_token = useRecoilValue(loggedInUserState);
  const [updateable, setUpdateable] = useState(false);

  useEffect(() => {
    let samePassword = false;

    if (
      (formData.name !== user_token?.user.name && formData.name !== "") ||
      (formData.email !== user_token?.user.email && formData.email !== "") ||
      (!samePassword && formData.password !== "") ||
      (formData.avatar !== user_token?.user.avatar &&
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