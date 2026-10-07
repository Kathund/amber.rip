import LinkComponent from '../components/LinkComponent.tsx';
import useSettings from '../contexts/settings/useSettings.ts';
import { twMerge } from 'tailwind-merge';

export default function Unknown404() {
  const { settings } = useSettings();

  return (
    <div
      className={twMerge(
        settings.darkMode ? 'text-white' : 'text-black',
        'flex h-full w-full flex-col items-center justify-center'
      )}>
      <LinkComponent to="/">
        <p className="text-4xl">404 not found!</p>
        <p className="text-xl">I think we might be lost...</p>
        <p>Can we go home, please?</p>
      </LinkComponent>
    </div>
  );
}
