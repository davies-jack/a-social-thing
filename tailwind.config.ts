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
        'dashboard': '300px 1fr',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        'bg-primary': 'var(--bg-primary)',
        'primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-card': 'var(--bg-card)',
        'headline-text': 'var(--headline-text)',
        'paragraph-text': 'var(--paragraph-text)',
        'bg-button': 'var(--bg-button)',
        'bg-button-secondary': 'var(--bg-button-secondary)',
        'button-text': 'var(--button-text)',
        'error-red': 'var(--error-red)',
        'warning-amber': 'var(--warning-amber)',
        'info-blue': 'var(--info-blue)',
        'success-green': 'var(--success-green)',
        'tertiary': 'var(--tertiary)', 
      },
    },
  },
  plugins: [],
} satisfies Config;
