import { convertIndexToHex, getHandleLink } from './static/functions.ts';
import type { HandleItem } from './components/handles/Handle.tsx';

type Row = [string, string, string, string];
interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const curlRegex = /curl(?:\/|$)/i;
const responseLines = ['#!/usr/bin/env amber', '', 'amber.rip <3', ''];

function getColumnWidths(rows: Row[]): number[] {
  if (rows.length === 0) return [];
  return rows[0]!.map((_, columnIndex) => Math.max(...rows.map((row) => row[columnIndex]?.length ?? 0)));
}

function formatRow(row: Row, columnWidths: number[]): string {
  return row
    .map((value, index) => {
      if (index === row.length - 1) return value;
      return `${value.padEnd(columnWidths[index] ?? value.length)} `;
    })
    .join('');
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

    const rows: Row[] = handles.map((handle, index) => [
      `${convertIndexToHex(index)} `,
      handle.label,
      handle.handle,
      getHandleLink(handle, url)
    ]);

    const columnWidths = getColumnWidths(rows);
    for (const row of rows) responseLines.push(formatRow(row, columnWidths));
    return new Response(`${responseLines.join('\n')}\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
};
