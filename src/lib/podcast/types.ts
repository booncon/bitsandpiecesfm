export type Episode = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  audio: string;
  duration?: string;
  explicit?: boolean;
  image?: string;
  draft?: boolean;
  subtitle?: string;
  tags: string[];
  html: string;
  audioSize: number;
  episodeNumber: number;
  appleId?: number;
  guid?: string;
  season?: number;
  episodeType?: string;
};

export type EpisodeFrontmatter = Omit<
  Episode,
  'slug' | 'html' | 'audioSize' | 'episodeNumber'
>;
