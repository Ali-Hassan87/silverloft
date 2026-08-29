/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',       // near-black, primary text
        paper: '#FAFAF9',     // off-white background
        steel: '#8A8F98',     // mid grey (logo tone)
        silver: '#C7CBD1',    // light silver (logo highlight)
        graphite: '#26282B',  // deep charcoal panels
        accent: '#5B6472'     // slate accent, echoes the diamond logo
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      keyframes: {
        'word-in': {
          '0%': { transform: 'translateY(60%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' }
        },
        'word-out': {
          '0%': { transform: 'translateY(0%)', opacity: '1' },
          '100%': { transform: 'translateY(-60%)', opacity: '0' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'word-in': 'word-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'word-out': 'word-out 0.4s cubic-bezier(0.5, 0, 0.75, 0) forwards',
        marquee: 'marquee 28s linear infinite'
      }
    }
  },
  colors: {
    paper: '#0a0a0a',
    ink: '#ffffff',
  },
  plugins: []
};

