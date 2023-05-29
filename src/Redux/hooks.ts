import { useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useInput<T>(initialValue: T): [T, (param: T) => void] {
  const [value, setValue] = useState(initialValue);

  const handleChange = (param: T) => {
    setValue(param);
  };

  return [value, handleChange];
}
