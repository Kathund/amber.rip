import LinkComponent from './LinkComponent.tsx';
import useSettings from '../contexts/settings/useSettings.ts';
import { twMerge } from 'tailwind-merge';
import type { ItemWithId } from '../types/misc.ts';

export default function TableItem({
  value,
  description,
  note,
  link,
  valueClassName,
  id
}: ItemWithId<{ value: string; description: string; note?: string; link?: string; valueClassName?: string }>) {
  const { settings } = useSettings();

  const className = twMerge(
    settings.reducedMotion ? 'duration-0' : 'duration-300',
    settings.darkMode
      ? 'border-b-white/20 hover:bg-white hover:text-black/40'
      : 'border-b-black/20 hover:bg-black hover:text-white/40',
    'group border-b transition-all'
  );
  const content = (
    <div className="grid grid-cols-1 items-center gap-2 px-4 py-2 lg:grid-cols-[5rem_minmax(0,1fr)_max-content]">
      <p className="hidden lg:block">{id}</p>
      <div
        className={twMerge(
          settings.reducedMotion ? 'duration-0' : 'duration-300',
          'transition-all ease-in-out group-hover:pl-3'
        )}>
        <p
          className={twMerge(
            settings.darkMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white',
            'text-3xl',
            valueClassName
          )}>
          {value}
        </p>
        {note && <p>{note}</p>}
      </div>
      <p className="hidden text-right lg:block">{description}</p>
      <div className="flex flex-row items-center justify-between lg:hidden">
        <p>{id}</p>
        <p>{description}</p>
      </div>
    </div>
  );

  if (!link) return <div className={className}>{content}</div>;
  return (
    <LinkComponent to={link} className={className} reloadDocument>
      {content}
    </LinkComponent>
  );
}
