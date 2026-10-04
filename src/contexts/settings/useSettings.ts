import SettingsContext from './SettingsContext.ts';
import { useContext } from 'react';

export default function useSettings() {
  const context = useContext(SettingsContext);
  if (context === null) throw new Error('useSettings must be used inside a SettingsProvider');
  return context;
}
