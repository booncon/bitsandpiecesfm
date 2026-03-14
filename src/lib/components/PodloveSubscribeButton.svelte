<script lang="ts">
  import { podcastConfig, absoluteUrl } from '$lib/config/podcast';

  export let buttonId: string | undefined = undefined;

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
  
  // Conditionally add data-buttonid and data-hide if buttonId is provided
  const buttonAttributes = buttonId 
    ? `data-buttonid="${buttonId}" data-hide="true" ` 
    : '';

  const buttonScript = `<script class="podlove-subscribe-button" src="https://cdn.podlove.org/subscribe-button/javascripts/app.js" data-language="en" data-size="medium" data-json-data="podcastData" data-color="#1f7a68" data-style="filled" ${buttonAttributes}><\/script>`;
</script>

<svelte:head>
  {@html setupScript}
</svelte:head>

{#if !buttonId}
<div class="podlove-wrapper">
  {@html buttonScript}
</div>
{:else}
  {@html buttonScript}
{/if}

<style>
  .podlove-wrapper {
    display: inline-block;
  }
</style>
