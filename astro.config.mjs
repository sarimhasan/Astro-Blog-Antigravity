// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), markdoc(), keystatic()],
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    optimizeDeps: {
      include: ['tslib', '@formatjs/icu-messageformat-parser']
    }
  }
});