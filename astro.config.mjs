// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
// A GitHub Pages la base ha de ser /nom-del-repo/ (en CI es defineix BASE_PATH)
export default defineConfig({
  base: process.env.BASE_PATH ? `/${process.env.BASE_PATH}/` : '/new-portfolio/',
  integrations: [react()],
  server: {
    host: true,
    port: 4321,
  },
});
