import * as React from "react";

const maybe = (exp, d?) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

export const useHandlerWhenClickedOutside = (callback: () => void) => {
  const elementRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (maybe(() => elementRef.current && e.target, null)) {
      if (elementRef.current!.contains(e.target as Element)) {
        return;
      }
      callback();
    }
  };

  const setElementRef = () => elementRef;

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    setElementRef
  };
};

export default useHandlerWhenClickedOutside;
