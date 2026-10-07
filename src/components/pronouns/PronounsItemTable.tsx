import TableItem from '../TableItem.tsx';
import useSettings from '../../contexts/settings/useSettings.ts';
import { convertIndexToHex } from '../../static/functions.ts';
import { twMerge } from 'tailwind-merge';
import type { PronounsItemData } from '../../static/pronouns.ts';

export default function PronounsItemTable({ title, values }: PronounsItemData) {
  const { settings } = useSettings();
  return (
    <div className="flex flex-col">
      <p
        className={twMerge(
          settings.darkMode ? 'text-white' : 'text-black',
          'text-center text-4xl font-bold lg:text-left'
        )}>
        {title}
      </p>
      <div
        className={twMerge(
          settings.darkMode ? 'border-b-white/20' : 'border-b-black/20',
          'hidden grid-cols-[5rem_minmax(0,1fr)_12rem] items-center border-b p-4 lg:grid'
        )}>
        <p>ID</p>
        <p>VALUE</p>
        <p className="text-right">PREFERENCE</p>
      </div>
      {values.map((item, index) => (
        <TableItem
          id={convertIndexToHex(index)}
          value={item.value}
          description={item.preference}
          key={convertIndexToHex(index)}
        />
      ))}
    </div>
  );
}
