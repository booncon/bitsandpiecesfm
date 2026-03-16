<script lang="ts">
  let { src, cover, title = 'Episode' }: {
    src: string;
    cover: string;
    title?: string;
  } = $props();

  let paused = $state(true);
  let currentTime = $state(0);
  let duration = $state(0);
  let volume = $state(1);
  let muted = $state(false);

  function formatTime(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function handleSeek(e: Event): void {
    const input = e.currentTarget as HTMLInputElement;
    const audio = input.closest('.player')?.querySelector('audio');
    if (audio && duration > 0) {
      const pct = Number(input.value) / 100;
      audio.currentTime = pct * duration;
    }
  }

  function togglePlay(): void {
    paused = !paused;
  }

  function toggleMute(): void {
    muted = !muted;
  }

  const progressPct = $derived(duration > 0 ? (currentTime / duration) * 100 : 0);
</script>

<div class="player">
  <img class="cover" src={cover} alt="" aria-hidden="true" loading="lazy" />
  <div class="controls">
    <audio
      preload="none"
      bind:paused
      bind:currentTime
      bind:duration
      bind:volume
      bind:muted
      onended={() => (paused = true)}
    >
      <source {src} type="audio/mpeg" />
    </audio>
    <button
      type="button"
      class="play-btn"
      aria-label={paused ? `Play ${title}` : `Pause ${title}`}
      onclick={togglePlay}
    >
      {#if paused}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5 3.5l12 6.5-12 6.5V3.5z" />
        </svg>
      {:else}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5 3h3v14H5V3zm7 0h3v14h-3V3z" />
        </svg>
      {/if}
    </button>
    <div class="track">
      <span class="time">{formatTime(currentTime)}</span>
      <input
        type="range"
        class="scrubber"
        min="0"
        max="100"
        value={progressPct}
        step="0.1"
        aria-label="Seek"
        oninput={handleSeek}
      />
      <span class="time dur">{formatTime(duration)}</span>
    </div>
    <button
      type="button"
      class="mute-btn"
      aria-label={muted ? 'Unmute' : 'Mute'}
      onclick={toggleMute}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {#if muted || volume === 0}
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        {:else}
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        {/if}
      </svg>
    </button>
  </div>
</div>

<style>
  .player {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.75rem;
    border-radius: 0.875rem;
    border: 1px solid var(--border);
    background: var(--surface);
  }

  .cover {
    width: 56px;
    height: 56px;
    border-radius: 0.5rem;
    object-fit: cover;
    flex-shrink: 0;
    background-color: var(--brand);
  }

  .controls {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .play-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--accent);
    color: white;
    cursor: pointer;
    font: inherit;
  }

  .play-btn:hover {
    background: var(--accent-strong);
  }

  .mute-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    padding: 0;
    border: none;
    border-radius: 0.5rem;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    font: inherit;
  }

  .mute-btn:hover {
    color: var(--accent-strong);
  }

  .track {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .time {
    font-size: 0.8rem;
    color: var(--muted);
    min-width: 2.25rem;
  }

  .time.dur {
    text-align: right;
  }

  .scrubber {
    flex: 1;
    min-width: 0;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--border);
    border-radius: 2px;
  }

  .scrubber::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
  }

  .scrubber::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
    border: none;
  }

  @media (max-width: 480px) {
    .cover {
      display: none;
    }
  }
</style>
