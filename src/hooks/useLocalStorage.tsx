import { SetStateAction, Dispatch, useCallback, useState } from "react";

function parse<T>(str: string): T | undefined {
  try {
    return JSON.parse(str);
  } catch {
    return undefined;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    const str = window.localStorage.getItem(key);
    if (!str) return initialValue;
    return (parse(str) as T) ?? initialValue;
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue());

  const setValue: SetValue<T> = useCallback((value) => {
    const item = value instanceof Function ? value(storedValue) : value;
    window.localStorage.setItem(key, JSON.stringify(item));
    setStoredValue(item);
  }, []);

  return [storedValue, setValue];
}
