import PronounsItemTable from '../components/pronouns/PronounsItemTable.tsx';
import PronounsLegendTable from '../components/pronouns/PronounsLegendTable.tsx';
import { useEffect, useState } from 'react';
import type { PronounsData } from '../static/pronouns.ts';

export default function Pronouns() {
  const [pronounsData, setPronounsData] = useState<PronounsData | undefined | null>(undefined);

  useEffect(() => {
    let isMounted = true;

    fetch('/data/pronouns.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load pronouns: ${response.status}`);
        return response.json() as Promise<PronounsData>;
      })
      .then((loaded) => {
        if (isMounted) setPronounsData(loaded);
      })
      .catch((error: unknown) => {
        console.error(error);
        if (isMounted) setPronounsData(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (pronounsData === undefined) return <p>Loading pronouns…</p>;
  if (pronounsData === null) return <p>Failed to load pronouns.</p>;

  return (
    <>
      {pronounsData.Items.map((item) => (
        <PronounsItemTable {...item} key={item.title} />
      ))}
      <PronounsLegendTable values={pronounsData.Legend} />
    </>
  );
}
