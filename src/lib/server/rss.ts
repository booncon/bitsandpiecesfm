import { absoluteUrl, podcastConfig } from '$lib/config/podcast';
import type { Episode } from '$lib/podcast/types';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function generateRss(episodes: Episode[]): string {
  const items = episodes
    .map((episode) => {
      const episodeUrl = absoluteUrl(`/${episode.slug}/`);
      const imageUrl = absoluteUrl(episode.image ?? podcastConfig.coverImage);

      const isExplicit = episode.explicit ?? podcastConfig.explicit;

      return [
        '<item>',
        `<title>${escapeXml(episode.title)}</title>`,
        `<link>${escapeXml(episodeUrl)}</link>`,
        episode.guid
          ? `<guid isPermaLink="false">${escapeXml(episode.guid)}</guid>`
          : `<guid isPermaLink="true">${escapeXml(episodeUrl)}</guid>`,
        `<pubDate>${new Date(episode.date).toUTCString()}</pubDate>`,
        `<description>${escapeXml(episode.summary)}</description>`,
        `<itunes:summary>${escapeXml(episode.summary)}</itunes:summary>`,
        `<itunes:subtitle>${escapeXml(episode.subtitle ?? episode.summary)}</itunes:subtitle>`,
        `<itunes:duration>${escapeXml(episode.duration ?? '')}</itunes:duration>`,
        `<itunes:explicit>${isExplicit ? 'true' : 'false'}</itunes:explicit>`,
        `<itunes:image href="${escapeXml(imageUrl)}" />`,
        `<enclosure url="${escapeXml(absoluteUrl(episode.audio))}" length="${episode.audioSize}" type="audio/mpeg" />`,
        ...episode.tags.map((tag) => `<category>${escapeXml(tag)}</category>`),
        '</item>'
      ].join('');
    })
    .join('');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">',
    '<channel>',
    `<title>${escapeXml(podcastConfig.title)}</title>`,
    `<link>${escapeXml(absoluteUrl('/'))}</link>`,
    `<language>${escapeXml(podcastConfig.language)}</language>`,
    `<description>${escapeXml(podcastConfig.description)}</description>`,
    `<copyright>${escapeXml(podcastConfig.copyright)}</copyright>`,
    `<itunes:author>${escapeXml(podcastConfig.author)}</itunes:author>`,
    `<itunes:summary>${escapeXml(podcastConfig.description)}</itunes:summary>`,
    `<itunes:explicit>${podcastConfig.explicit ? 'true' : 'false'}</itunes:explicit>`,
    `<itunes:image href="${escapeXml(absoluteUrl(podcastConfig.coverImage))}" />`,
    '<itunes:owner>',
    `<itunes:name>${escapeXml(podcastConfig.author)}</itunes:name>`,
    `<itunes:email>${escapeXml(podcastConfig.email)}</itunes:email>`,
    '</itunes:owner>',
    `<itunes:category text="${escapeXml(podcastConfig.category)}" />`,
    items,
    '</channel>',
    '</rss>'
  ].join('');
}
