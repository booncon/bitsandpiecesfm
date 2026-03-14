import adapter from '@sveltejs/adapter-static';

const basePath = process.env.BASE_PATH ?? '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html'
    }),
    alias: {
      $content: 'src/content',
      $config: 'src/lib/config'
    },
    paths: {
      base: basePath
    },
    prerender: {
      entries: ['*', '/rss.xml']
    }
  }
};

export default config;
