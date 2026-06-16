import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: '#050B1F',
        ink: '#071633',
        gold: '#C9A14A',
        parchment: '#F3E6C2',
        mist: '#E9E9E9',
        finantBlue: '#0A2E5C'
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 60px rgba(201, 161, 74, 0.18)'
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle at top, rgba(201,161,74,.18), transparent 35%)',
        'radial-blue': 'radial-gradient(circle at center, rgba(19,76,145,.24), transparent 45%)'
      }
    }
  },
  plugins: []
};

export default config;
