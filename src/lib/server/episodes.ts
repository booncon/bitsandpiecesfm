import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { parseEpisodeMarkdown, slugFromFilename, sortEpisodes } from '$lib/podcast/content';
import type { Episode } from '$lib/podcast/types';

const staticDir = join(process.cwd(), 'static');

let cachedEpisodes: Episode[] | null = null;

function absoluteStaticPath(assetPath: string): string {
  return join(staticDir, assetPath.replace(/^\//, ''));
}

function loadEpisodes(): Episode[] {
  const files = import.meta.glob('/src/content/episodes/*.md', {
    eager: true,
    import: 'default',
    query: '?raw'
  }) as Record<string, string>;

  const episodes = Object.entries(files).map(([filename, raw]) => {
    const slug = slugFromFilename(filename);

    return parseEpisodeMarkdown(slug, raw, {
      audioExists: (audioPath) => existsSync(absoluteStaticPath(audioPath)),
      audioSize: (audioPath) => statSync(absoluteStaticPath(audioPath)).size
    });
  });

  return sortEpisodes(episodes).filter((episode) => !episode.draft);
}

export function getEpisodes(): Episode[] {
  cachedEpisodes ??= loadEpisodes();
  return cachedEpisodes;
}

export function getEpisode(slug: string): Episode | undefined {
  return getEpisodes().find((episode) => episode.slug === slug);
}
