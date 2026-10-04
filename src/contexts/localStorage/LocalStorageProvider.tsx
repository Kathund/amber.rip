import LocalStorageContext from './LocalStorageContext.ts';
import type { ReactNode } from 'react';

function getItem<T>(key: string, fallback: T): T {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? fallback : (JSON.parse(storedValue) as T);
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    if (serializedValue !== undefined) localStorage.setItem(key, serializedValue);
  } catch {
    //
  }
}

function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    //
  }
}

export default function LocalStorageProvider({ children }: { children: ReactNode }) {
  return (
    <LocalStorageContext.Provider value={{ getItem, setItem, removeItem }}>{children}</LocalStorageContext.Provider>
  );
}
