/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        void: '#000000',
        platinum: '#f0f0f0',
        chrome: '#cccccc',
        dim: '#888888',
        subtle: '#333333'
      },
      letterSpacing: {
        ultra: '0.3em',
        widest: '0.2em'
      }
    }
  },
  plugins: []
}
