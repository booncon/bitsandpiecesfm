<slot />

<style>
  :global(:root) {
    color-scheme: light;
    --bg: #f4efe7;
    --bg-strong: #efe6da;
    --surface: rgba(255, 255, 255, 0.82);
    --surface-strong: rgba(255, 255, 255, 0.94);
    --text: #16241f;
    --muted: #53655f;
    --accent: #1f7a68;
    --accent-strong: #0f5d4e;
    --border: rgba(22, 36, 31, 0.12);
    --shadow: 0 24px 80px rgba(22, 36, 31, 0.08);
  }

  :global(html) {
    background:
      radial-gradient(circle at top left, rgba(31, 122, 104, 0.22), transparent 28rem),
      linear-gradient(180deg, #f8f4ee 0%, var(--bg) 100%);
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
    color: var(--text);
    background: transparent;
    font-family: "Avenir Next", "Segoe UI", sans-serif;
    line-height: 1.6;
  }

  :global(h1, h2, h3) {
    font-family: Charter, "Iowan Old Style", "Palatino Linotype", "Book Antiqua", serif;
    letter-spacing: -0.02em;
    line-height: 1.05;
    margin: 0;
  }

  :global(p) {
    margin: 0;
  }

  :global(a) {
    color: inherit;
    text-decoration-color: rgba(31, 122, 104, 0.45);
    text-underline-offset: 0.18em;
  }

  :global(a:hover) {
    text-decoration-color: var(--accent);
  }

  :global(img) {
    display: block;
    max-width: 100%;
  }

  :global(audio) {
    width: 100%;
  }
  </style>
