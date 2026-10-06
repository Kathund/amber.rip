import HandleTable from '../components/HandleTable.tsx';
import { useEffect, useState } from 'react';
import type { HandleItem } from '../static/handles.ts';

export default function Home() {
  const [handles, setHandles] = useState<HandleItem[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetch('/data/handles.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load handles: ${response.status}`);
        return response.json() as Promise<HandleItem[]>;
      })
      .then((loaded) => {
        if (isMounted) setHandles(loaded);
      })
      .catch((error: unknown) => console.error(error));

    return () => {
      isMounted = false;
    };
  }, []);

  return <HandleTable handles={handles} />;
}
