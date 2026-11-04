import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C6383B',
          'red-hover': '#AB2F32',
          'red-light': '#FCEEEF',
          'red-subtle': '#FDF5F5',
          white: '#FFFFFF',
          bg: '#F8F8F8',
          text: '#252525',
          'text-secondary': '#777777',
          'text-muted': '#9E9E9E',
          charcoal: '#161616',
          'charcoal-light': '#222222',
          border: '#EAEAEA',
          'border-light': '#F2F2F2',
          success: '#21865B',
          'success-light': '#E9F5EF',
          warning: '#D68A2E',
          'warning-light': '#FBF3E8',
          error: '#C6383B',
          'error-light': '#FCEEEF',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['"Helvetica Neue"', 'Helvetica', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['"Helvetica Neue"', 'Helvetica', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        serif: ['"Helvetica Neue"', 'Helvetica', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px rgba(0, 0, 0, 0.08)',
        'dropdown': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'sticky': '0 4px 20px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'badge': '6px',
        'modal': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

