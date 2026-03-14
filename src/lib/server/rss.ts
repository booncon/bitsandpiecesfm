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
  const lastBuildDate = new Date().toUTCString();
  
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
        `<content:encoded><![CDATA[${episode.html}]]></content:encoded>`,
        `<itunes:summary>${escapeXml(episode.summary)}</itunes:summary>`,
        `<itunes:subtitle>${escapeXml(episode.subtitle ?? episode.summary)}</itunes:subtitle>`,
        `<itunes:duration>${escapeXml(episode.duration ?? '')}</itunes:duration>`,
        `<itunes:explicit>${isExplicit ? 'true' : 'false'}</itunes:explicit>`,
        `<itunes:image href="${escapeXml(imageUrl)}" />`,
        `<itunes:season>${episode.season ?? 1}</itunes:season>`,
        `<itunes:episode>${episode.episodeNumber}</itunes:episode>`,
        `<itunes:episodeType>${escapeXml(episode.episodeType ?? 'full')}</itunes:episodeType>`,
        `<enclosure url="${escapeXml(absoluteUrl(episode.audio))}" length="${episode.audioSize}" type="audio/mpeg" />`,
        `<googleplay:description>${escapeXml(episode.summary)}</googleplay:description>`,
        `<googleplay:image href="${escapeXml(imageUrl)}" />`,
        `<googleplay:explicit>${isExplicit ? 'yes' : 'no'}</googleplay:explicit>`,
        ...episode.tags.map((tag) => `<category>${escapeXml(tag)}</category>`),
        '</item>'
      ].join('');
    })
    .join('');

  const categories = podcastConfig.categories
    .map((cat) => `<itunes:category text="${escapeXml(cat)}" />`)
    .join('');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" ',
    '  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" ',
    '  xmlns:content="http://purl.org/rss/1.0/modules/content/" ',
    '  xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" ',
    '  xmlns:atom="http://www.w3.org/2005/Atom" ',
    '>',
    '<channel>',
    `<title>${escapeXml(podcastConfig.title)}</title>`,
    `<link>${escapeXml(absoluteUrl('/'))}</link>`,
    `<atom:link href="${escapeXml(absoluteUrl('/rss.xml'))}" rel="self" type="application/rss+xml" />`,
    `<language>${escapeXml(podcastConfig.language)}</language>`,
    `<description>${escapeXml(podcastConfig.description)}</description>`,
    `<copyright>${escapeXml(podcastConfig.copyright)}</copyright>`,
    `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `<itunes:author>${escapeXml(podcastConfig.author)}</itunes:author>`,
    `<itunes:summary>${escapeXml(podcastConfig.description)}</itunes:summary>`,
    `<itunes:type>${escapeXml(podcastConfig.itunesType)}</itunes:type>`,
    `<itunes:explicit>${podcastConfig.explicit ? 'true' : 'false'}</itunes:explicit>`,
    `<itunes:image href="${escapeXml(absoluteUrl(podcastConfig.coverImage))}" />`,
    categories,
    '<itunes:owner>',
    `<itunes:name>${escapeXml(podcastConfig.author)}</itunes:name>`,
    `<itunes:email>${escapeXml(podcastConfig.email)}</itunes:email>`,
    '</itunes:owner>',
    `<googleplay:author>${escapeXml(podcastConfig.author)}</googleplay:author>`,
    `<googleplay:description>${escapeXml(podcastConfig.description)}</googleplay:description>`,
    `<googleplay:image href="${escapeXml(absoluteUrl(podcastConfig.coverImage))}" />`,
    `<googleplay:category text="${escapeXml(podcastConfig.googlePlayCategory)}" />`,
    `<googleplay:explicit>${podcastConfig.explicit ? 'yes' : 'no'}</googleplay:explicit>`,
    items,
    '</channel>',
    '</rss>'
  ].join('');
}
