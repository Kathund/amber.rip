import ButtonComponent from './components/ButtonComponent.tsx';
import FancyCursor from './components/FancyCursor.tsx';
import LinkComponent from './components/LinkComponent.tsx';
import StarField from './components/stars/StarField.tsx';
import useSettings from './contexts/settings/useSettings.ts';
import { Route, Routes, useLocation } from 'react-router';
import { lazy, useState } from 'react';
import { randomNumber } from './static/functions.ts';
import { twMerge } from 'tailwind-merge';
import type { StarParticleProps } from './components/stars/StarParticle.tsx';

const Home = lazy(() => import('./pages/Home.tsx'));
const Pronouns = lazy(() => import('./pages/Pronouns.tsx'));
const Unknown404 = lazy(() => import('./pages/Unknown404.tsx'));

export default function App() {
  const { settings, setSettings } = useSettings();
  const [particles] = useState<StarParticleProps[]>(() =>
    new Array(randomNumber(20, 35))
      .fill({})
      .map((_, index) => ({ delay: ((Math.random() * 10) % 1) + 2.5, offset: Math.random(), index }))
  );

  const location = useLocation();
  const currentPath = location.pathname;
  const routes: { name: string; path: string }[] = [
    { name: 'Home', path: '/' },
    { name: 'Pronouns', path: '/pronouns' }
  ];

  return (
    <div
      className={twMerge(
        settings.fancyCursor ? 'cursor-none' : '',
        settings.darkMode ? 'bg-black text-white/25' : 'bg-white text-black/25',
        'relative flex min-h-screen flex-col items-center overflow-hidden font-mono'
      )}>
      {!settings.reducedMotion && <StarField particles={particles} />}
      {settings.fancyCursor && <FancyCursor />}
      <div className="flex min-h-screen min-w-screen flex-col lg:min-w-5/10">
        <header className="relative text-sm">
          <div
            className={twMerge(
              settings.darkMode ? 'border-b-white/20' : 'border-b-black/20',
              'grid grid-cols-2 items-center border-b p-4'
            )}>
            <div className="flex flex-col justify-self-start">
              <p
                className={twMerge(
                  settings.reducedMotion ? 'duration-0' : 'duration-300',
                  settings.darkMode ? 'hover:text-white' : 'hover:text-black'
                )}>
                $ curl amber.rip
              </p>
              <p
                className={twMerge(
                  settings.reducedMotion ? 'duration-0' : 'duration-300',
                  settings.darkMode ? 'hover:text-white' : 'hover:text-black'
                )}>
                #!/usr/bin/env amber
              </p>
            </div>
            <div className="flex flex-col justify-self-end text-right">
              <LinkComponent to="/pgp" title="926A E4E7 F90C C6E2 FED6 D71B 0CC2 5AAA 1364 985C" reloadDocument>
                pgp: 1364985C
              </LinkComponent>
              <LinkComponent to="/ssh" reloadDocument>
                ssh: id_ed25519.pub
              </LinkComponent>
            </div>
          </div>
          <div className="flex flex-row gap-2 pt-4 pl-4">
            {routes.map(({ name, path }) => (
              <LinkComponent to={path} key={path} className={path === currentPath ? 'underline' : ''}>
                {name}
              </LinkComponent>
            ))}
          </div>
        </header>
        <main className="relative flex flex-col gap-12 py-16">
          <div className="text-center lg:text-left">
            <p className={twMerge(settings.darkMode ? 'text-white' : 'text-black', 'text-8xl font-bold')}>amber</p>
            <div className={twMerge(settings.darkMode ? 'text-white/40' : 'text-black/40', 'flex flex-col text-sm')}>
              <p>i write shitty code</p>
              <p>she/her</p>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pronouns" element={<Pronouns />} />
            <Route path="*" element={<Unknown404 />} />
          </Routes>
        </main>
        <footer
          className={twMerge(
            settings.darkMode ? 'border-t-white/20' : 'border-t-black/20',
            'relative mt-auto grid grid-cols-2 items-center border-t p-4 text-sm'
          )}>
          <div className="flex flex-col justify-self-start">
            <div
              className={twMerge(
                settings.reducedMotion ? 'duration-0' : 'duration-300',
                settings.darkMode ? 'hover:text-white' : 'hover:text-black',
                'flex flex-col justify-self-start'
              )}>
              <p>made with 💜</p>
            </div>
            <ButtonComponent
              name="dark mode"
              value={settings.darkMode}
              onClick={() => setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
            />
          </div>
          <div className="flex flex-col justify-self-end text-right">
            <ButtonComponent
              name="fancy cursor"
              value={settings.fancyCursor}
              onClick={() => setSettings((prev) => ({ ...prev, fancyCursor: !prev.fancyCursor }))}
            />
            <ButtonComponent
              name="reduce motion"
              value={settings.reducedMotion}
              onClick={() => setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
