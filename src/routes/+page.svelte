<script lang="ts">
  import { base } from '$app/paths';
  import { podcastConfig } from '$lib/config/podcast';
  import { formatBytes, formatDate } from '$lib/utils/format';
  import PodloveSubscribeButton from '$lib/components/PodloveSubscribeButton.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{podcastConfig.title}</title>
  <meta name="description" content={podcastConfig.description} />
  <link rel="alternate" type="application/rss+xml" title={podcastConfig.title} href={`${base}/rss.xml`} />
</svelte:head>

<script lang="ts" context="module">
  export {};
</script>

<div class="page-shell">
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">{podcastConfig.tagline}</p>
      <h1>{podcastConfig.title}</h1>
      <p class="lead">{podcastConfig.description}</p>
      <div class="hero-actions">
        <PodloveSubscribeButton />
        <span class="meta">{data.episodes.length} episodes</span>
      </div>
    </div>

    <div class="cover-card">
      <img
        src={`${base}${podcastConfig.coverImage}`}
        alt={`${podcastConfig.title} cover artwork`}
        width="720"
        height="720"
      />
    </div>
  </section>

  <section class="feature">
    <div class="section-label">Latest episode</div>
    <article class="feature-card">
      <div class="feature-copy">
        <p class="episode-number">Episode {data.latest.episodeNumber}</p>
        <h2>{data.latest.title}</h2>
        {#if data.latest.subtitle}
          <p class="subtitle">{data.latest.subtitle}</p>
        {/if}
        <p class="summary">{data.latest.summary}</p>

        <div class="feature-meta">
          <span>{formatDate(data.latest.date)}</span>
          {#if data.latest.duration}
            <span>{data.latest.duration}</span>
          {/if}
          <span>{formatBytes(data.latest.audioSize)}</span>
        </div>

        <div class="feature-actions">
          <a class="button" href={`${base}/${data.latest.slug}/`}>Open episode</a>
          <a class="text-link" href={`${base}${data.latest.audio}`}>Download audio</a>
        </div>
      </div>

      {#if data.latest.appleId}
        <iframe
          src={`https://embed.podcasts.apple.com/us/podcast/bits-pieces/id967039989?i=${data.latest.appleId}`}
          height="175"
          width="100%"
          frameborder="0"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          allow="autoplay *; encrypted-media *;"
          style="width: 100%; overflow: hidden; border-radius: 10px; background-color: transparent;"
          title="Apple Podcast Player"
        ></iframe>
      {:else}
        <audio controls preload="none" src={`${base}${data.latest.audio}`}></audio>
      {/if}
    </article>
  </section>

  <section class="archive">
    <div class="section-heading">
      <div>
        <div class="section-label">Archive</div>
        <h2>Every episode in one place</h2>
      </div>
      <p class="section-copy">
        Episodes are authored in markdown, audio lives in the repository, and the site is built as static HTML.
      </p>
    </div>

    <div class="archive-list">
      {#each data.archive as episode}
        <article class="episode-card">
          <div class="episode-head">
            <p class="episode-number">Episode {episode.episodeNumber}</p>
            <p class="episode-date">{formatDate(episode.date)}</p>
          </div>
          <h3>
            <a href={`${base}/${episode.slug}/`}>{episode.title}</a>
          </h3>
          {#if episode.subtitle}
            <p class="subtitle">{episode.subtitle}</p>
          {/if}
          <p class="summary">{episode.summary}</p>
          <div class="card-footer">
            <div class="card-meta">
              {#if episode.duration}
                <span>{episode.duration}</span>
              {/if}
              <span>{formatBytes(episode.audioSize)}</span>
            </div>
            <a class="text-link" href={`${base}/${episode.slug}/`}>Read notes</a>
          </div>
        </article>
      {/each}
    </div>
  </section>
</div>

<style>
  .page-shell {
    width: min(1100px, calc(100vw - 2rem));
    margin: 0 auto;
    padding: 2rem 0 4rem;
  }

  .hero {
    display: grid;
    gap: 1.5rem;
    align-items: center;
  }

  .hero-copy,
  .feature-card,
  .episode-card,
  .cover-card {
    border: 1px solid var(--border);
    background: var(--surface);
    backdrop-filter: blur(20px);
    box-shadow: var(--shadow);
  }

  .hero-copy {
    padding: clamp(1.5rem, 3vw, 3rem);
    border-radius: 2rem;
  }

  .hero-copy h1 {
    font-size: clamp(3.5rem, 7vw, 6rem);
    max-width: 9ch;
    margin-top: 0.25rem;
  }

  .eyebrow,
  .section-label,
  .episode-number {
    color: var(--accent-strong);
    font-size: 0.86rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .lead,
  .section-copy,
  .summary,
  .subtitle {
    color: var(--muted);
  }

  .lead {
    margin-top: 1rem;
    max-width: 52ch;
    font-size: 1.05rem;
  }

  .hero-actions,
  .feature-meta,
  .feature-actions,
  .card-footer,
  .card-meta,
  .episode-head,
  .section-heading {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .hero-actions {
    margin-top: 1.5rem;
    justify-content: flex-start;
  }

  .button,
  .text-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-weight: 600;
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

  .text-link {
    color: var(--accent-strong);
  }

  .meta,
  .feature-meta,
  .card-meta,
  .episode-date {
    color: var(--muted);
    font-size: 0.95rem;
  }

  .cover-card {
    border-radius: 2rem;
    overflow: hidden;
    aspect-ratio: 1;
  }

  .feature,
  .archive {
    margin-top: 2.5rem;
  }

  .feature-card {
    margin-top: 0.75rem;
    padding: 1.5rem;
    border-radius: 2rem;
    display: grid;
    gap: 1.25rem;
  }

  .feature-copy h2,
  .archive h2 {
    font-size: clamp(2rem, 5vw, 3.2rem);
  }

  .subtitle {
    margin-top: 0.4rem;
    font-style: italic;
  }

  .summary {
    margin-top: 1rem;
  }

  .feature-meta,
  .feature-actions {
    margin-top: 1rem;
    justify-content: flex-start;
  }

  .archive-list {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
  }

  .episode-card {
    border-radius: 1.5rem;
    padding: 1.25rem;
  }

  .episode-card h3 {
    margin-top: 0.5rem;
    font-size: 1.8rem;
  }

  .episode-card .subtitle,
  .episode-card .summary {
    margin-top: 0.75rem;
  }

  .card-footer {
    margin-top: 1rem;
    justify-content: space-between;
  }

  @media (min-width: 820px) {
    .hero {
      grid-template-columns: 1.4fr minmax(280px, 0.8fr);
    }

    .feature-card {
      grid-template-columns: 1.35fr 0.95fr;
      align-items: center;
    }

    .archive-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
