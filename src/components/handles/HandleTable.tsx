import useSettings from '../../contexts/settings/useSettings.ts';
import { Handle, type HandleItem } from './Handle.tsx';
import { convertIndexToHex } from '../../static/functions.ts';
import { twMerge } from 'tailwind-merge';

export function HandleTable({ handles }: { handles: HandleItem[] }) {
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
        <Handle {...handle} id={convertIndexToHex(index)} key={convertIndexToHex(index)} />
      ))}
    </div>
  );
}
