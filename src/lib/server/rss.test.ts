import { describe, expect, it } from 'vitest';

import { generateRss } from './rss';

describe('generateRss', () => {
  it('includes enclosure metadata for each episode', () => {
    const rss = generateRss([
      {
        slug: 'bp001-phong-shui',
        title: 'bp001 - Phong Shui',
        date: '2015-02-12',
        summary: 'Episode summary',
        audio: '/media/episodes/bp001-phong-shui.mp3',
        duration: '07:52',
        tags: ['feng shui'],
        html: '<p>Episode summary</p>',
        audioSize: 5676924,
        episodeNumber: 1
      }
    ]);

    expect(rss).toContain('<rss version="2.0"');
    expect(rss).toContain('enclosure url=');
    expect(rss).toContain('length="5676924"');
    expect(rss).toContain('<category>feng shui</category>');
  });
});
