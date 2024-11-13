/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                body: ['Inter'],
            },
            colors: {
                primary: ['#30332E'],
                "primary-dark": ['#F9F3FC']
            },
            backgroundColor: {
                'primary': "#FFFBF3",
                'primary-dark': "#0E0E0E"
            }
        },
    },
    plugins: [
        plugin(function({ addBase, theme }) {
            addBase({
                'body': {
                    background: 'linear-gradient(to bottom, #090909, #0E0E0E, #090909)',
                    backgroundColor: theme('backgroundColor.primary-dark'),
                    color: theme('colors.primary-dark'),
                },
            });
        }),
    ],
}