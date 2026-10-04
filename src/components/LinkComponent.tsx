import useSettings from '../contexts/settings/useSettings.ts';
import { Link, type LinkProps } from 'react-router';
import { twMerge } from 'tailwind-merge';

export default function LinkComponent({ className, ...props }: LinkProps) {
  const { settings } = useSettings();
  return (
    <Link
      {...props}
      className={twMerge(
        settings.darkMode ? 'hover:text-white' : 'hover:text-black',
        settings.reducedMotion ? 'duration-0' : 'duration-300',
        settings.fancyCursor ? 'cursor-none' : 'cursor-pointer',
        className
      )}
    />
  );
}
