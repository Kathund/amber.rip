import useSettings from '../contexts/settings/useSettings.ts';
import { twMerge } from 'tailwind-merge';

export default function ButtonComponent({
  name,
  value,
  onClick,
  className
}: {
  name: string;
  value: boolean;
  className?: string;
  onClick: () => void;
}) {
  const { settings } = useSettings();
  return (
    <button
      type="button"
      className={twMerge(
        settings.reducedMotion ? 'duration-0' : 'duration-300',
        settings.fancyCursor ? 'cursor-none' : 'cursor-pointer',
        settings.darkMode ? 'hover:text-white' : 'hover:text-black',
        'group transition',
        className
      )}
      onClick={onClick}>
      <p>
        <span
          className={twMerge(
            settings.reducedMotion ? 'duration-0' : 'duration-300',
            value ? 'group-hover:text-red-300' : 'group-hover:text-green-300'
          )}>
          {value ? 'disable' : 'enable'}
        </span>{' '}
        {name}
      </p>
    </button>
  );
}
