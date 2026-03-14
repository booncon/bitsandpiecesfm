import { describe, expect, it } from 'vitest';

import { generateRss } from './rss';

describe('generateRss', () => {
  it('includes enclosure metadata and all new tags for each episode', () => {
    const rss = generateRss([
      {
        slug: 'bp001-phong-shui',
        title: 'bp001 - Phong Shui',
        date: '2015-02-12',
        summary: 'Episode summary',
        audio: '/media/episodes/bp001-phong-shui.mp3',
        duration: '07:52',
        tags: ['feng shui'],
        html: '<p>Episode summary with <strong>rich html</strong></p>',
        audioSize: 5676924,
        episodeNumber: 1,
        season: 1,
        episodeType: 'full'
      }
    ]);

    // Namespaces
    expect(rss).toContain('xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"');
    expect(rss).toContain('xmlns:content="http://purl.org/rss/1.0/modules/content/"');
    expect(rss).toContain('xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0"');
    expect(rss).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');

    // Channel metadata
    expect(rss).toContain('<itunes:type>episodic</itunes:type>');
    expect(rss).toContain('<lastBuildDate>');
    expect(rss).toContain('<atom:link href="https://bitsandpieces.fm/rss.xml" rel="self" type="application/rss+xml" />');
    expect(rss).toContain('<itunes:category text="Society &amp; Culture" />');
    expect(rss).toContain('<itunes:category text="Business" />');
    expect(rss).toContain('<itunes:category text="Education" />');
    expect(rss).toContain('<googleplay:category text="Business" />');

    // Item metadata
    expect(rss).toContain('<link>https://bitsandpieces.fm/bp001-phong-shui/</link>');
    expect(rss).toContain('<enclosure url="https://bitsandpieces.fm/media/episodes/bp001-phong-shui.mp3"');
    expect(rss).toContain('length="5676924"');
    expect(rss).toContain('<category>feng shui</category>');
    expect(rss).toContain('<content:encoded><![CDATA[<p>Episode summary with <strong>rich html</strong></p>]]></content:encoded>');
    expect(rss).toContain('<itunes:season>1</itunes:season>');
    expect(rss).toContain('<itunes:episode>1</itunes:episode>');
    expect(rss).toContain('<itunes:episodeType>full</itunes:episodeType>');
    expect(rss).toContain('<googleplay:description>Episode summary</googleplay:description>');
  });
});
