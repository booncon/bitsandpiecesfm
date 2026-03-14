export const podcastConfig = {
  siteUrl: (process.env.SITE_URL || "https://bitsandpieces.fm").replace(
    /\/$/,
    "",
  ),
  basePath: (process.env.BASE_PATH || "").replace(/\/$/, ""),
  title: "bits & pieces",
  tagline: "How to get things done & love your work.",
  description:
    "A show about why work is not a job, friendships and riding unicorns. Hosted by Lukas Jakob Hafner and Tobias Johannes.",
  author: "booncon",
  language: "en",
  coverImage: "/images/bitsandpieces-cover.jpg",
  email: "hello@booncon.com",
  copyright: "booncon",
  categories: ["Society & Culture", "Business", "Education"] as readonly string[],
  itunesType: "episodic",
  googlePlayCategory: "Business",
  explicit: false,
} as const;

export function absoluteUrl(pathname = ""): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${podcastConfig.siteUrl}${podcastConfig.basePath}${normalizedPath}`;
}
