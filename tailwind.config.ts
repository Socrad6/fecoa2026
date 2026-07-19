import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#061524',
          2: '#0a1f35',
          3: '#0d2d4a',
        },
        gold: {
          DEFAULT: '#C89B3C',
          2: '#E8B84B',
          3: '#F5D78E',
        },
        senegal: '#1A7A3C',
        guinea: '#C0392B',
        canada: '#D52B1E',
        text: '#D8D0C2',
        muted: '#7A8FA8',
        surface: {
          DEFAULT: '#0a1f35',
          2: '#061524',
          3: '#0d2d4a',
          light: '#f5f3ef',
          'light-2': '#ebe8e2',
          'light-3': '#e0ddd6',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
