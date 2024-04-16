import { useEffect, useRef, useState } from "react";

export const useToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navComponent = useRef<HTMLElement>(null);

  const handleBlur = (e: MouseEvent ) => {
    if (navComponent.current && !navComponent.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleBlur);

    return () => {
      document.removeEventListener('mousedown', handleBlur);
    };
  }, []);

  return { isOpen, setIsOpen, navComponent };
};

export default useToggleMenu;