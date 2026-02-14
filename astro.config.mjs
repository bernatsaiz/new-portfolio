// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
// En local: base '/' (obres http://localhost:4321). En CI: BASE_PATH = nom del repo.
export default defineConfig({
  base: process.env.BASE_PATH ? `/${process.env.BASE_PATH}/` : '/',
  integrations: [react()],
  server: {
    host: true,
    port: 4321,
  },
});
