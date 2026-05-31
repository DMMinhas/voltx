import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#060608',
        card:     '#0D0D10',
        border:   'rgba(255,255,255,0.06)',
        accent:   '#00FFCC',
        accent2:  '#BBFF00',
        muted:    '#8888AA',
        danger:   '#FF4466',
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        space: ['var(--font-space)', 'system-ui', 'sans-serif'],
        urdu:  ['var(--font-urdu)', 'serif'],
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'grid-move': 'gridMove 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,255,204,0.3)' },
          '50%':      { boxShadow: '0 0 60px rgba(0,255,204,0.7)' },
        },
        gridMove: {
          '0%':   { transform: 'translate(0,0)' },
          '100%': { transform: 'translate(60px,60px)' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(0,255,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,204,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}

export default config
