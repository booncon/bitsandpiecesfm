import { generateRss } from '$lib/server/rss';
import { getEpisodes } from '$lib/server/episodes';

export const prerender = true;

export function GET() {
  const body = generateRss(getEpisodes());

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600'
    }
  });
}
