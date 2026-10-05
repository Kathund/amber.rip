import type { HandleItem } from '../components/handles/Handle.tsx';

export function convertIndexToHex(index: number): string {
  return `0x${index.toString(16).padStart(2, '0')}`;
}

export function getHandleLink({ label, link }: HandleItem, url?: URL): string {
  if (link) return link;
  if (url) return new URL(`/${label}`, url.origin).href;
  return `/${label}`;
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
