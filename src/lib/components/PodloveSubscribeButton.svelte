<script lang="ts">
  import { podcastConfig, absoluteUrl } from '$lib/config/podcast';

  const podcastData = {
    title: podcastConfig.title,
    subtitle: podcastConfig.tagline,
    description: podcastConfig.description,
    cover: absoluteUrl(podcastConfig.coverImage),
    feeds: [
      {
        type: 'audio',
        format: 'mp3',
        url: absoluteUrl('/rss.xml')
      }
    ]
  };

  // Stringify the data to safely inject into the script tag
  const serializedData = JSON.stringify(podcastData);
  
  const setupScript = `<script>window.podcastData = ${serializedData};<\/script>`;
  const buttonScript = `<script class="podlove-subscribe-button" src="https://cdn.podlove.org/subscribe-button/javascripts/app.js" data-language="en" data-size="auto" data-json-data="podcastData" data-color="#1f7a68" data-format="cover" data-style="filled"><\/script>`;
</script>

<svelte:head>
  {@html setupScript}
</svelte:head>

<div class="podlove-wrapper">
  {@html buttonScript}
</div>

<style>
  .podlove-wrapper {
    display: inline-block;
  }
</style>
