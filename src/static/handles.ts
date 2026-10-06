import { createRow, formatRows } from './functions.ts';

export interface HandleItem {
  label: string;
  handle: string;
  link?: string;
  note?: string;
}

export type HandleRow = [string, string, string, string, string];

export function getHandleLink({ label, link }: HandleItem, url?: URL): string {
  if (link) return link;
  if (url) return new URL(`/${label}`, url.origin).href;
  return `/${label}`;
}

export function convertHandleToRow(handle: HandleItem, index: number, url: URL): HandleRow {
  return createRow(index, handle.label, handle.handle, getHandleLink(handle, url), handle.note ?? '-');
}

export function getHandleRows(handles: HandleItem[], url: URL): string[] {
  const rows: HandleRow[] = [
    ['ID', 'LABEL', 'HANDLE', 'LINK', 'NOTE'],
    ...handles.map((handle, index) => convertHandleToRow(handle, index, url))
  ];
  return formatRows(rows);
}
