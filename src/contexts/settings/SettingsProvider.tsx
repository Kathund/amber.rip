import SettingsContext from './SettingsContext.ts';
import useLocalStorage from '../localStorage/useLocalStorage.ts';
import { type Settings, defaultSettings } from '../../types/settings.ts';
import { useEffect, useState } from 'react';

function getDefaultSettings(): Settings {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return defaultSettings;

  return {
    ...defaultSettings,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    fancyCursor: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
  };
}

function loadSettings(stored: unknown): Settings {
  const defaults = getDefaultSettings();
  if (typeof stored !== 'object' || stored === null) return defaults;
  const saved = stored as Partial<Record<keyof Settings, unknown>>;

  return {
    reducedMotion: typeof saved.reducedMotion === 'boolean' ? saved.reducedMotion : defaults.reducedMotion,
    fancyCursor: typeof saved.fancyCursor === 'boolean' ? saved.fancyCursor : defaults.fancyCursor,
    darkMode: typeof saved.darkMode === 'boolean' ? saved.darkMode : defaults.darkMode
  };
}

export default function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { getItem, setItem } = useLocalStorage();
  const [settings, setSettings] = useState<Settings>(() => loadSettings(getItem<unknown>('settings', null)));

  useEffect(() => {
    setItem('settings', settings);
  }, [settings, setItem]);

  return <SettingsContext.Provider value={{ settings, setSettings }}>{children}</SettingsContext.Provider>;
}
