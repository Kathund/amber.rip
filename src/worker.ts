import { type HandleItem, getHandleRows } from './static/handles.ts';
import { type PronounsData, convertPronounsData } from './static/pronouns.ts';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const curlRegex = /curl(?:\/|$)/i;
const responseLines = ['#!/usr/bin/env amber', '', 'amber.rip <3'];

async function handleIndex(request: Request, url: URL, env: Env): Promise<Response> {
  const handlesRequest = await env.ASSETS.fetch(new Request(new URL('data/handles.json', url), request));
  if (!handlesRequest.ok) return env.ASSETS.fetch(request);
  const handles = (await handlesRequest.json()) as HandleItem[];
  return new Response(`${[...responseLines, '', ...getHandleRows(handles, url)].join('\n')}\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
}

async function handlePronouns(request: Request, url: URL, env: Env): Promise<Response> {
  const pronounsRequest = await env.ASSETS.fetch(new Request(new URL('data/pronouns.json', url), request));
  if (!pronounsRequest.ok) return env.ASSETS.fetch(request);
  const pronouns = (await pronounsRequest.json()) as PronounsData;
  return new Response(`${[...responseLines, ...convertPronounsData(pronouns)].join('\n')}\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent');
    if (!userAgent) return env.ASSETS.fetch(request);
    if (!curlRegex.test(userAgent)) return env.ASSETS.fetch(request);
    if (url.pathname === '/') return await handleIndex(request, url, env);
    else if (url.pathname === '/pronouns') return await handlePronouns(request, url, env);
    return env.ASSETS.fetch(request);
  }
};
