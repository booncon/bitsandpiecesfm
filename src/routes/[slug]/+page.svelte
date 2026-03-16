<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { absoluteUrl, podcastConfig } from '$lib/config/podcast';
  import { formatBytes, formatDate } from '$lib/utils/format';
  import PodloveSubscribeButton from '$lib/components/PodloveSubscribeButton.svelte';
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.episode.title} | {podcastConfig.title}</title>
  <meta name="description" content={data.episode.summary} />
  <link rel="canonical" href={absoluteUrl(`/${data.episode.slug}/`)} />
</svelte:head>

<div class="page-shell">
  <p class="back-link">
    <a href={resolve('/')}>Back to home</a>
  </p>

  <article class="episode-shell">
    <header class="episode-header">
      <div>
        <p class="eyebrow">Episode {data.episode.episodeNumber}</p>
        <h1>{data.episode.title}</h1>
        {#if data.episode.subtitle}
          <p class="subtitle">{data.episode.subtitle}</p>
        {/if}
      </div>

      <div class="header-meta">
        <span>{formatDate(data.episode.date)}</span>
        {#if data.episode.duration}
          <span>{data.episode.duration}</span>
        {/if}
        <span>{formatBytes(data.episode.audioSize)}</span>
      </div>
    </header>

    <section class="player-card">
      <p class="summary">{data.episode.summary}</p>
      <AudioPlayer
        src={asset(data.episode.audio)}
        cover={asset(data.episode.image ?? podcastConfig.coverImage)}
        title={data.episode.title}
      />
      <div class="player-links">
        <button class="button podlove-subscribe-button-episode-btn">Subscribe</button>
        <a class="text-link" href={asset(data.episode.audio)}>Download MP3</a>
        <PodloveSubscribeButton buttonId="episode-btn" />
      </div>
    </section>

    <section class="notes-card">
      <h2>Show notes</h2>
      <div class="prose">
        {@html data.episode.html}
      </div>
    </section>

    {#if data.episode.tags.length}
      <section class="tags-card">
        <h2>Topics</h2>
        <div class="tags">
          {#each data.episode.tags as tag}
            <span>{tag}</span>
          {/each}
        </div>
      </section>
    {/if}

    {#if data.relatedEpisodes.length}
      <aside class="related-card">
        <h2>More episodes</h2>
        <div class="related-list">
          {#each data.relatedEpisodes as episode}
            <a href={resolve(`/${episode.slug}/`)}>
              <strong>{episode.title}</strong>
              <span>{formatDate(episode.date)}</span>
            </a>
          {/each}
        </div>
      </aside>
    {/if}
  </article>
</div>

<style>
  .page-shell {
    width: min(860px, calc(100vw - 2rem));
    margin: 0 auto;
    padding: 2rem 0 4rem;
  }

  .back-link {
    margin: 0 0 1rem;
  }

  .episode-shell {
    display: grid;
    gap: 1rem;
  }

  .episode-header,
  .player-card,
  .notes-card,
  .tags-card,
  .related-card {
    border: 1px solid var(--border);
    border-radius: 1.2rem;
    background: var(--surface-strong);
    box-shadow: var(--shadow);
    padding: 1.4rem;
  }

  .eyebrow {
    color: var(--accent-strong);
    font-size: 0.86rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h1 {
    font-size: clamp(2.8rem, 8vw, 4.8rem);
    margin-top: 0.35rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .subtitle,
  .summary,
  .header-meta,
  .related-list span {
    color: var(--muted);
  }

  .subtitle {
    margin-top: 0.65rem;
    font-style: italic;
  }

  .header-meta,
  .player-links,
  .tags {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .header-meta {
    margin-top: 1rem;
  }

  .summary {
    margin-bottom: 1rem;
  }

  .player-links {
    margin-top: 1rem;
  }

  .button, .text-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    font: inherit;
    text-decoration: none;
  }

  .button {
    background: var(--accent);
    color: white;
    padding: 0.8rem 1.2rem;
  }

  .button:hover {
    background: var(--accent-strong);
    text-decoration: none;
  }

  .prose :global(h2),
  .prose :global(h3) {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  .prose :global(p + p),
  .prose :global(p + ul),
  .prose :global(ul + p),
  .prose :global(ul + h2),
  .prose :global(p + h2) {
    margin-top: 1rem;
  }

  .prose :global(ul) {
    padding-left: 1.2rem;
  }

  .tags span {
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(31, 122, 104, 0.08);
    padding: 0.45rem 0.8rem;
  }

  .related-list {
    display: grid;
    gap: 0.75rem;
  }

  .related-list a {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
    text-decoration: none;
  }

  .related-list a:first-child {
    border-top: 0;
    padding-top: 0;
  }
</style>
