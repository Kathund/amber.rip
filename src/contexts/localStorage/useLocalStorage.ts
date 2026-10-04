import LocalStorageContext from './LocalStorageContext.ts';
import { useContext } from 'react';

export default function useLocalStorage() {
  const context = useContext(LocalStorageContext);
  if (context === null) throw new Error('useLocalStorage must be used inside a LocalStorageProvider');
  return context;
}
