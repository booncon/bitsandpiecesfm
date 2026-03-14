<script>
  import "../app.css";
  import { base } from '$app/paths';
</script>

<div class="layout-container">
  <main class="main-content">
    <slot />
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <p>&copy; 2026 booncon oy</p>
      <nav>
        <a href="{base}/privacy">Privacy Policy</a>
      </nav>
    </div>
  </footer>
</div>

<style>
  .layout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
  }

  .site-footer {
    border-top: 1px solid var(--border);
    padding: 2rem 0;
    margin-top: 4rem;
    background: transparent;
  }

  .footer-inner {
    width: min(1100px, calc(100vw - 2rem));
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .footer-inner a {
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-inner a:hover {
    color: var(--accent);
    text-decoration: underline;
    text-decoration-color: var(--accent);
  }
</style>
