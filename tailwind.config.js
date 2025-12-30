/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Baleda Brand Color Palette
        // Inspired by Balinese Bale Dauh - traditional guest welcoming space

        // Pampas - Warm neutral background and secondary surfaces
        pampas: {
          50: '#fafaf9',
          100: '#f5f4f2',
          200: '#EAE4DC', // Main Pampas color
          300: '#ddd6cc',
          400: '#c9bfb3',
          500: '#b5a99a',
          600: '#998e82',
          700: '#7d7469',
          800: '#625954',
          900: '#4a4541',
        },

        // Anzac Gold - Ceremonial gold for highlights, gradients, and CTAs
        gold: {
          50: '#fdf8f0',
          100: '#faf0dc',
          200: '#f5deb3',
          300: '#efc97f',
          400: '#E1A847', // Anzac - Main ceremonial gold
          500: '#d49435',
          600: '#b87a28',
          700: '#946020',
          800: '#784e1d',
          900: '#5f3e19',
        },

        // Mallard Green - Deep green for structure, navigation, and headings
        green: {
          50: '#f6f8f4',
          100: '#e8ede4',
          200: '#d1dbc9',
          300: '#a9bea0',
          400: '#7a9a6b',
          500: '#587a4a',
          600: '#435e38',
          700: '#32491E', // Mallard - Main deep green
          800: '#2a3d1a',
          900: '#223217',
        },

        // Milano Red - Deep red for status and presence indicators (use sparingly)
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#B6150A', // Milano Red - Main deep red
          800: '#991b1b',
          900: '#7f1d1d',
        },

        // Legacy primary colors (for backward compatibility)
        primary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Legacy Gemini colors (keep for backward compatibility, will phase out)
        gemini: {
          cyan: '#06B6D4',
          'cyan-light': '#22D3EE',
          'cyan-dark': '#0891B2',
          blue: '#3B82F6',
          'blue-google': '#4285F4',
          'blue-dark': '#2563EB',
          azure: '#3B82F6',
          purple: '#8B5CF6',
          'purple-deep': '#7C3AED',
          violet: '#7E22CE',
          magenta: '#C026D3',
          'magenta-light': '#D946EF',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'gradient': 'gradient-shift 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(217, 70, 239, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(217, 70, 239, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}