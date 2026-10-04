import useSettings from '../contexts/settings/useSettings.ts';
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';

const interactiveSelector =
  'a, button, input, select, textarea, summary, [role="button"], [tabindex]:not([tabindex="-1"])';

export default function FancyCursor() {
  const { settings } = useSettings();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!cursor || !finePointer.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add('isVisible');
      const target = event.target instanceof Element ? event.target.closest(interactiveSelector) : null;
      cursor.classList.toggle('isInteractive', target !== null);
    };

    const hideCursor = () => cursor.classList.remove('isVisible', 'isInteractive');

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('blur', hideCursor);
    document.addEventListener('pointerleave', hideCursor);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', hideCursor);
      document.removeEventListener('pointerleave', hideCursor);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={twMerge(
        settings.reducedMotion ? 'duration-0' : 'duration-300',
        'fancyCursor pointer-events-none fixed top-0 left-0 z-50 block h-4 w-4 -translate-x-1/2 -translate-y-1/2 scale-100 rounded-full bg-white opacity-0 mix-blend-difference transition-[opacity,transform] ease-in-out'
      )}
      ref={cursorRef}
    />
  );
}
