import matter from 'gray-matter';
import { marked } from 'marked';
import { z } from 'zod';

import type { Episode } from './types';

const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.preprocess(
    (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
  ),
  summary: z.string().min(1),
  audio: z.string().min(1).startsWith('/'),
  duration: z.string().min(1).optional(),
  explicit: z.boolean().optional(),
  image: z.string().min(1).optional(),
  draft: z.boolean().optional(),
  subtitle: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).default([]),
  appleId: z.number().optional()
});

const slugPattern = /^bp\d{3}-[a-z0-9-]+$/;

export function slugFromFilename(filename: string): string {
  const normalized = filename.split('/').pop()?.replace(/\.md$/, '');

  if (!normalized || !slugPattern.test(normalized)) {
    throw new Error(`Invalid episode filename "${filename}".`);
  }

  return normalized;
}

export function episodeNumberFromSlug(slug: string): number {
  return Number.parseInt(slug.slice(2, 5), 10);
}

export function sortEpisodes<T extends { date: string; slug: string }>(episodes: T[]): T[] {
  return [...episodes].sort((left, right) => {
    const dateComparison = right.date.localeCompare(left.date);

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return right.slug.localeCompare(left.slug);
  });
}

export function parseEpisodeMarkdown(
  slug: string,
  raw: string,
  options: {
    audioExists: (audioPath: string) => boolean;
    audioSize: (audioPath: string) => number;
  }
): Episode {
  if (!slugPattern.test(slug)) {
    throw new Error(`Invalid episode slug "${slug}".`);
  }

  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(`Invalid frontmatter for "${slug}": ${parsed.error.message}`);
  }

  const frontmatter = parsed.data;

  if (!options.audioExists(frontmatter.audio)) {
    throw new Error(`Audio file "${frontmatter.audio}" referenced by "${slug}" does not exist.`);
  }

  const html = marked.parse(content.trim(), {
    breaks: true,
    gfm: true
  }) as string;

  return {
    slug,
    ...frontmatter,
    tags: frontmatter.tags,
    html,
    audioSize: options.audioSize(frontmatter.audio),
    episodeNumber: episodeNumberFromSlug(slug)
  };
}
