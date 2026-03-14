import { describe, expect, it } from 'vitest';

import { parseEpisodeMarkdown, slugFromFilename, sortEpisodes } from './content';

describe('slugFromFilename', () => {
  it('extracts a slug from a markdown file path', () => {
    expect(slugFromFilename('/tmp/src/content/episodes/bp001-phong-shui.md')).toBe(
      'bp001-phong-shui'
    );
  });

  it('rejects invalid filenames', () => {
    expect(() => slugFromFilename('hello-world.md')).toThrow('Invalid episode filename');
  });
});

describe('parseEpisodeMarkdown', () => {
  const raw = `---
title: bp001 - Phong Shui
date: 2015-02-12
summary: Episode summary
audio: /media/episodes/bp001-phong-shui.mp3
duration: 07:52
subtitle: Random topics like feng shui
tags:
  - feng shui
  - work
---

## Overview

Hello from markdown.
`;

  it('parses markdown and validates audio references', () => {
    const episode = parseEpisodeMarkdown('bp001-phong-shui', raw, {
      audioExists: (audioPath) => audioPath === '/media/episodes/bp001-phong-shui.mp3',
      audioSize: () => 5676924
    });

    expect(episode.title).toBe('bp001 - Phong Shui');
    expect(episode.episodeNumber).toBe(1);
    expect(episode.audioSize).toBe(5676924);
    expect(episode.html).toContain('<h2>Overview</h2>');
  });

  it('fails when audio is missing', () => {
    expect(() =>
      parseEpisodeMarkdown('bp001-phong-shui', raw, {
        audioExists: () => false,
        audioSize: () => 0
      })
    ).toThrow('does not exist');
  });
});

describe('sortEpisodes', () => {
  it('sorts newest first', () => {
    const sorted = sortEpisodes([
      { slug: 'bp001-phong-shui', date: '2015-02-12' },
      { slug: 'bp007-hitlers-dirty-surrogates', date: '2016-10-18' },
      { slug: 'bp006-cat-gif-offsprings', date: '2016-10-03' }
    ]);

    expect(sorted.map((episode) => episode.slug)).toEqual([
      'bp007-hitlers-dirty-surrogates',
      'bp006-cat-gif-offsprings',
      'bp001-phong-shui'
    ]);
  });
});
