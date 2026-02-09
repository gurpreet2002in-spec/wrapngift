/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                secondary: "rgb(var(--color-secondary) / <alpha-value>)",
                accent: "rgb(var(--color-accent) / <alpha-value>)",
                pearl: "rgb(var(--color-pearl) / <alpha-value>)",
                champagne: "rgb(var(--color-champagne) / <alpha-value>)",
                background: "rgb(var(--color-background) / <alpha-value>)",
                text: {
                    DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
                    light: "rgb(var(--color-text-light) / <alpha-value>)",
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Cormorant Garamond', 'Georgia', 'serif'],
            }
        },
    },
    plugins: [],
}
