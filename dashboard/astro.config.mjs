// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeRelativeMdLinks from './src/lib/rehype-relative-md-links.mjs';

// https://astro.build/config
// TODO: 호스팅(공개 범위) 결정 후 site/base를 실제 도메인·경로로 교체.
//   - GitHub Pages 프로젝트 사이트면 site: 'https://<계정>.github.io', base: '/<repo>'
//   - 루트 도메인/Vercel 등이면 base 생략(루트 '/')
export default defineConfig({
  site: 'https://example.com',
  base: '/',
  integrations: [react(), sitemap(), pagefind()],
  build: { format: 'directory' },
  markdown: {
    rehypePlugins: [rehypeRelativeMdLinks],
  },
  vite: {
    // @ts-ignore - Vite plugin type mismatch between @tailwindcss/vite and Astro's bundled Vite
    plugins: [tailwindcss()],
  },
});
