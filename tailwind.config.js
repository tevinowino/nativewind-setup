/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        light: {
          primary: {
            start: '#E9E1FF',
            end: '#F4EEFF',
            accent: '#6A3DE8'
          },
          surface: 'rgba(255, 255, 255, 0.6)',
          text: {
            primary: '#2D2D2D',
            secondary: '#868686'
          },
          border: 'rgba(255, 255, 255, 0.8)'
        },
        // Dark Mode Colors
        dark: {
          primary: {
            start: '#2C1E4A',
            end: '#1A1A2E',
            accent: '#A88AFF'
          },
          surface: 'rgba(44, 30, 74, 0.5)',
          text: {
            primary: '#F5F5F5',
            secondary: '#A0A0A0'
          },
          border: 'rgba(168, 138, 255, 0.2)'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'h1': ['28px', { lineHeight: '120%', fontWeight: '700' }],
        'h2': ['22px', { lineHeight: '130%', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '150%', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '150%', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '100%', fontWeight: '500' }],
        'caption': ['12px', { lineHeight: '100%', fontWeight: '400' }]
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px'
      },
      borderRadius: {
        'glass': '20px',
        'input': '12px',
        'button': '16px',
        'full': '9999px'
      },
      backdropBlur: {
        'glass': '12px'
      },
      boxShadow: {
        'glass-light': '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
      },
    },
  },
  plugins: [],
};