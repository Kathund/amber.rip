import { createContext } from 'react';
import type { LocalStorageContextValue } from '../../types/localStorage.ts';

const LocalStorageContext = createContext<LocalStorageContextValue | null>(null);
export default LocalStorageContext;
