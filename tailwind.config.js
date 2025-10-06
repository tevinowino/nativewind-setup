/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16a34a',
          dark: '#22c55e',
        },
        background: {
          light: '#f9fafb',
          dark: '#111827',
        },
        card: {
          light: '#ffffff',
          dark: '#1f2937',
        },
        text: {
          primary: {
            light: '#1f2937',
            dark: '#f9fafb',
          },
          secondary: {
            light: '#6b7280',
            dark: '#9ca3af',
          },
        },
        border: {
          light: '#e5e7eb',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
};