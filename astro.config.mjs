import { defineConfig } from 'astro/config';
import favicons from 'astro-favicons'; // Add code manually
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import simpleStackForm from 'simple-stack-form';
import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'http://localhost:4321',
  trailingSlash: 'never',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      applyBaseStyles: false,
    }),
    icon(),
    mdx(),
    react(),
    simpleStackForm(),
    sitemap(),
    favicons({
      masterPicture: './src/assets/images/site/favicon.svg',
      // emitAssets: true,

      // You should adjust the following options accordingly
      appName: '',
      appShortName: '',
      appDescription: '',
      // dir:"auto",
      lang: 'en-US',
      // display: "standalone",
      // orientation: "any",
      // start_url: "/?homescreen=1",
      background: '#fff',
      theme_color: '#fff',
      faviconsDarkMode: false, // default `true`, Make favicon compatible with light and dark modes

      // appleStatusBarStyle: "black-translucent",

      //....
    }),
  ],
  adapter: node({
    mode: 'standalone',
  }),
});
