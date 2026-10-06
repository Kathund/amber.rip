import useSettings from '../contexts/settings/useSettings.ts';
import { HandleTable } from '../components/handles/HandleTable.tsx';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import type { HandleItem } from '../components/handles/Handle.tsx';

export default function Home() {
  const [handles, setHandles] = useState<HandleItem[]>([]);
  const { settings } = useSettings();

  useEffect(() => {
    let isMounted = true;

    fetch('/handles.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load handles: ${response.status}`);
        return response.json() as Promise<HandleItem[]>;
      })
      .then((loadedHandles) => {
        if (isMounted) setHandles(loadedHandles);
      })
      .catch((error: unknown) => console.error(error));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="text-center lg:text-left">
        <p className={twMerge(settings.darkMode ? 'text-white' : 'text-black', 'text-8xl font-bold')}>amber</p>
        <div className={twMerge(settings.darkMode ? 'text-white/40' : 'text-black/40', 'flex flex-col text-sm')}>
          <p>i write shitty code</p>
          <p>she/her</p>
        </div>
      </div>
      <HandleTable handles={handles} />
    </>
  );
}
