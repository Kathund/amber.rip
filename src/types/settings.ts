export interface Settings {
  reducedMotion: boolean;
  fancyCursor: boolean;
  darkMode: boolean;
}

export const defaultSettings: Settings = { reducedMotion: false, fancyCursor: true, darkMode: false } as const;

export interface SettingsContextValue {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}
