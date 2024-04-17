/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: ['-left-4', '-left-8'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      dark: colors.black,
      light: colors.white,
      base: colors.slate,
      tertiary: colors.emerald,
      secondary: colors.violet,
      primary: colors.yellow,
      pink: colors.fuchsia,
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      circle: 'circle',
      dash: '-',
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/mazey.svg')",
        pattern: "url('/maze2.svg')",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        main: 'minmax(0.75rem, 3rem) 1fr minmax(0.75rem, 3rem)',
        mobile: '0.75rem 1fr 0.75rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
};
