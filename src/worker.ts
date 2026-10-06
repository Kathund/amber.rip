import { convertIndexToHex, getHandleLink } from './static/functions.ts';
import type { HandleItem } from './components/handles/Handle.tsx';

type Row = [string, string, string, string, string];
interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const curlRegex = /curl(?:\/|$)/i;
const responseLines = ['#!/usr/bin/env amber', '', 'amber.rip <3', ''];

function convertHandleToRow(handle: HandleItem, index: number, url: URL): Row {
  return [convertIndexToHex(index), handle.label, handle.handle, getHandleLink(handle, url), handle.note ?? '-'];
}

function getRows(handles: HandleItem[], url: URL): string[] {
  const rows: Row[] = [
    ['ID', 'LABEL', 'HANDLE', 'LINK', 'NOTE'],
    ...handles.map((handle, index) => convertHandleToRow(handle, index, url))
  ];
  if (rows.length === 0) return [];
  const columnWidths = rows[0]!.map((_, columnIndex) => Math.max(...rows.map((row) => row[columnIndex]?.length ?? 0)));

  return rows.map((row) =>
    row
      .map((value, index) => {
        if (index === row.length - 1) return value;
        return `${value.padEnd(columnWidths[index] ?? value.length)} `;
      })
      .join('')
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent');
    if (url.pathname !== '/') return env.ASSETS.fetch(request);
    if (!userAgent) return env.ASSETS.fetch(request);
    if (!curlRegex.test(userAgent)) return env.ASSETS.fetch(request);

    const handlesRequest = await env.ASSETS.fetch(new Request(new URL('handles.json', url), request));
    if (!handlesRequest.ok) return env.ASSETS.fetch(request);
    const handles = (await handlesRequest.json()) as HandleItem[];

    return new Response(`${[...responseLines, ...getRows(handles, url)].join('\n')}\n`, {
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    });
  }
};
