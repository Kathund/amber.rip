import { createContext } from 'react';
import type { SettingsContextValue } from '../../types/settings.ts';

const SettingsContext = createContext<SettingsContextValue | null>(null);
export default SettingsContext;
