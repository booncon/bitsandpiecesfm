<script>
  import { resolve } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | booncon</title>
</svelte:head>

<div class="page-shell privacy-page">
  <div class="header">
    <a href={resolve('/')} class="back-link">← Back to home</a>
    <h1>Privacy Policy</h1>
  </div>

  <div class="content-panel">
    <h2>1. Controller</h2>
    <p>
      <strong>booncon oy</strong><br />
      Suvilahdenkatu 4 B 24<br />
      00500 Helsinki<br />
      Finland<br />
      Phone: +358458980609<br />
      Email: <a href="mailto:hello@booncon.com">hello@booncon.com</a><br />
      Website: <a href="https://booncon.com">https://booncon.com</a>
    </p>

    <h2>2. Personal Data & Cookies</h2>
    <p>Our website uses cookies to provide user-friendly services. If you prefer, you can disable cookies in your browser settings. We collect general data and information (such as browser type, operating system, and IP address) in server log files to ensure our website functions correctly and securely.</p>

    <h2>3. Data Storage & Erasure</h2>
    <p>We only store personal data for the period necessary to achieve the purpose of storage, or as required by law. Once the purpose is fulfilled or the storage period expires, personal data is routinely erased or blocked.</p>

    <h2>4. Your Rights</h2>
    <p>You have the right to request confirmation as to whether your personal data is being processed, and to access the personal data we hold about you. You may also have rights to rectification, erasure, or restriction of processing in accordance with the GDPR.</p>
  </div>
</div>

<style>
  .privacy-page {
    width: min(800px, calc(100vw - 2rem));
    margin: 0 auto;
    padding: 3rem 0 4rem;
  }

  @media (max-width: 819px) {
    .privacy-page {
      padding-top: 2rem;
    }
  }

  .header {
    margin-bottom: 2.5rem;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 1.5rem;
    color: var(--muted);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--accent);
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin: 0;
  }

  .content-panel {
    background: var(--surface);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    border-radius: 1.2rem;
    padding: clamp(1.5rem, 4vw, 3rem);
  }

  h2 {
    font-size: 1.6rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text);
  }

  .content-panel h2:first-child {
    margin-top: 0;
  }

  .content-panel p {
    line-height: 1.7;
    color: var(--text);
    margin-bottom: 1.2rem;
    font-size: 1.05rem;
  }

  .content-panel p:last-child {
    margin-bottom: 0;
  }

  .content-panel a {
    color: var(--accent);
    text-decoration: underline;
    text-decoration-color: rgba(31, 122, 104, 0.45);
    text-underline-offset: 0.18em;
  }

  .content-panel a:hover {
    text-decoration-color: var(--accent);
  }
</style>
