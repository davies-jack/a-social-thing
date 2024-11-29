import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'dashboard': 'minmax(300px, .4fr) minmax(500px, 1fr)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-card': 'var(--bg-card)',
        'headline-text': 'var(--headline-text)',
        'paragraph-text': 'var(--paragraph-text)',
        'bg-button': 'var(--bg-button)',
        'button-text': 'var(--button-text)',
        'tertiary': 'var(--tertiary)', 
      },
    },
  },
  plugins: [],
} satisfies Config;
