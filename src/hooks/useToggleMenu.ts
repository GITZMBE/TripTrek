import { useEffect, useRef, useState } from "react";

/**
 * Used for toggling a drop down menu as well as hidding when menu button is being blurred.
 */
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