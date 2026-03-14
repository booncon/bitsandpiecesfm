import { error } from '@sveltejs/kit';

import { getEpisode, getEpisodes } from '$lib/server/episodes';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  const episode = getEpisode(params.slug);

  if (!episode) {
    throw error(404, 'Episode not found');
  }

  const relatedEpisodes = getEpisodes()
    .filter((entry) => entry.slug !== episode.slug)
    .slice(0, 3);

  return {
    episode,
    relatedEpisodes
  };
};
