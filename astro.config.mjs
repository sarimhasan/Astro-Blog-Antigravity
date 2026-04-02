// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), markdoc(), keystatic()],
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["tslib", "@formatjs/icu-messageformat-parser"],
    },
  },
});
