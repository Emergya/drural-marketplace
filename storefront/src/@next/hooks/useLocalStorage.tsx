import React from "react";

export const useLocalStorage = <T,>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = React.useState<T>();

  React.useEffect(() => {
    if (!storedValue) {
      const getInitialValue = () => {
        try {
          const item = window.localStorage.getItem(key);
          return item ? JSON.parse(item) : initialValue;
        } catch (error) {
          return initialValue;
        }
      };

      setStoredValue(getInitialValue());
    }
  }, [key, initialValue]);

  const setValue = React.useCallback(
    (value: T) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Could not save ${key} to localStorage`);
      }
    },
    [storedValue, key]
  );

  return { storedValue, setValue };
};
