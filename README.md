# bits & pieces

A standalone SvelteKit rebuild of the old Booncon podcast archive.

## Stack

- SvelteKit with `@sveltejs/adapter-static`
- Markdown episode files in `src/content/episodes`
- Audio assets in `static/media/episodes`
- RSS feed generated at build time from the same episode source

## Local development

```bash
npm install
npm run dev
```

## Content model

Each episode is a markdown file with frontmatter:

```yaml
title: bp001 - Phong Shui
date: 2015-02-12
summary: Short summary
audio: /media/episodes/bp001-phong-shui.mp3
duration: 07:52
subtitle: Optional subtitle
tags:
  - topic one
  - topic two
```

The filename becomes the public slug, so `bp001-phong-shui.md` builds to `/bp001-phong-shui/`.

## Static media

Audio files are local project assets under `static/media/episodes`. The build fails if a markdown file references audio that does not exist.

The current GitHub Pages workflow assumes a repository site URL. If you later move to a custom domain, set `BASE_PATH` to an empty string and update `SITE_URL` in the deployment workflow.

## Commands

```bash
npm run check
npm run test
npm run build
```
