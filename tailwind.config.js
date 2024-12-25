/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      colors:{
        bgMain:"var(--bg-main)",
        bgSecondary:"var(--bg-secondary)",
        fontColor:"var(--font-color)",
        bgButton:"var(--bg-button)",
      },
    },
  },
  plugins: [],
}

