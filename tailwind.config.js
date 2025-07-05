export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: [
    'backdrop-blur', 'backdrop-blur-md',
    'bg-white/10', 'bg-purple-800/30', 'bg-purple-900',
    'border-purple-600', 'text-purple-300', 'text-purple-200',
    'hover:bg-purple-700', 'bg-purple-600'
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
      },
    },
  },
  plugins: [],
};
