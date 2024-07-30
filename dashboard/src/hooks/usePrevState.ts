import { useEffect, useRef } from "react";

function usePrevState(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
export default usePrevState;
