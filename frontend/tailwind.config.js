/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                snow: {
                    900: '#1a2b4b', // Deep Blue (Background)
                    800: '#2c3e6b', // Card Application
                    700: '#3e518c', // Interactive
                    100: '#e0f2fe', // Ice Blue (Accents)
                    50: '#f0f9ff', // White/Snow
                }
            }
        },
    },
    plugins: [],
}
