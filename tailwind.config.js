/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // Accessibility-focused color palette with proper contrast ratios
      colors: {
        // Blue palette for primary actions
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // Primary blue - 4.5:1 contrast on white
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a", // Dark blue for hero background
        },
        // Gray palette for text and backgrounds
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937", // Dark text - 16.75:1 contrast on white
          900: "#111827",
        },
        // Yellow for accents and warnings
        yellow: {
          300: "#fde047",
          400: "#facc15", // Accent yellow - 5.94:1 contrast on blue-900
          500: "#eab308",
        },
      },
      // Focus ring utilities for accessibility
      ringWidth: {
        3: "3px",
        4: "4px",
      },
      // Minimum touch target sizes
      minHeight: {
        44: "44px", // WCAG minimum touch target
      },
      minWidth: {
        44: "44px", // WCAG minimum touch target
      },
    },
  },
  plugins: [],
};
