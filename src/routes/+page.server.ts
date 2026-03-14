import { getEpisodes } from '$lib/server/episodes';

export function load() {
  const episodes = getEpisodes();
  const [latest, ...archive] = episodes;

  return {
    latest,
    archive,
    episodes
  };
}
