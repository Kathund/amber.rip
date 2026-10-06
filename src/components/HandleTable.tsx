import TableItem from './TableItem.tsx';
import useSettings from '../contexts/settings/useSettings.ts';
import { convertIndexToHex } from '../static/functions.ts';
import { twMerge } from 'tailwind-merge';
import type { HandleItem } from '../static/handles.ts';

export default function HandleTable({ handles }: { handles: HandleItem[] }) {
  const { settings } = useSettings();
  return (
    <div className="flex flex-col">
      <div
        className={twMerge(
          settings.darkMode ? 'border-b-white/20' : 'border-b-black/20',
          'hidden grid-cols-[5rem_minmax(0,1fr)_12rem] items-center border-b p-4 lg:grid'
        )}>
        <p>ID</p>
        <p>LINK</p>
        <p className="text-right">HANDLE</p>
      </div>
      {handles.map((handle, index) => (
        <TableItem
          id={convertIndexToHex(index)}
          value={handle.label}
          description={handle.handle}
          note={handle.note}
          key={convertIndexToHex(index)}
          link={handle.link ?? `/${handle.label}`}
          valueClassName="font-bold text-5xl"
        />
      ))}
    </div>
  );
}
