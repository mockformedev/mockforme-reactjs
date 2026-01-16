/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // blue-600
        danger: "#dc2626",    // red-600
        muted: "#6b7280",     // gray-500
        border: "#e5e7eb",    // gray-200
        panel: "#f9fafb"      // gray-50
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "monospace"
        ]
      }
    }
  },

  plugins: [],
};
