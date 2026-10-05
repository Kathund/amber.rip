import LinkComponent from '../LinkComponent.tsx';
import useSettings from '../../contexts/settings/useSettings.ts';
import { twMerge } from 'tailwind-merge';

export interface HandleItem {
  label: string;
  handle: string;
  link?: string;
}

export interface HandleProps extends HandleItem {
  id: string;
}

export function Handle({ label, handle, link = `/${label}`, id }: HandleProps) {
  const { settings } = useSettings();
  return (
    <LinkComponent
      to={link}
      className={twMerge(
        settings.reducedMotion ? 'duration-0' : 'duration-300',
        settings.darkMode
          ? 'border-b-white/20 hover:bg-white hover:text-black/40'
          : 'border-b-black/20 hover:bg-black hover:text-white/40',
        'group border-b transition-colors'
      )}
      reloadDocument>
      <div className="grid grid-cols-1 items-center gap-2 p-4 lg:grid-cols-[5rem_minmax(0,1fr)_max-content]">
        <p className="hidden lg:block">{id}</p>
        <p
          className={twMerge(
            settings.reducedMotion ? 'duration-0' : 'duration-300',
            settings.darkMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white',
            'text-5xl font-bold transition-all ease-in-out group-hover:pl-3'
          )}>
          {label}
        </p>
        <p className="hidden text-right lg:block">{handle}</p>
        <div className="flex flex-row items-center justify-between lg:hidden">
          <p>{id}</p>
          <p>{handle}</p>
        </div>
      </div>
    </LinkComponent>
  );
}
