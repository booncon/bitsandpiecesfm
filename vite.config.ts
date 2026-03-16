/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import Sitemap from 'vite-plugin-sitemap';
import { defineConfig } from 'vite';
import { mkdirSync } from 'fs';

const siteUrl = (process.env.SITE_URL ?? 'https://bitsandpieces.fm').replace(/\/$/, '');
const basePath = (process.env.BASE_PATH ?? '').replace(/\/$/, '');
const hostname = basePath ? `${siteUrl}${basePath}` : siteUrl;

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit(),
    {
      name: 'ensure-build-dir',
      closeBundle() {
        mkdirSync('build', { recursive: true });
      }
    },
    Sitemap({
      hostname,
      outDir: 'build',
      exclude: ['/rss.xml']
    })
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts']
  }
});
