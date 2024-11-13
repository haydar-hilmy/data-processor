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
                "primary-dark": ['#E7E7E7']
            },
            backgroundColor: {
                'primary': "#FFFBF3",
                'primary-dark': "#141414",
                'secondary-dark': "#1E1E1E"
            }
        },
    },
    plugins: [
        plugin(function ({ addBase, theme }) {
            addBase({
                'body': {
                    backgroundColor: theme('backgroundColor.primary-dark'),
                    color: theme('colors.primary-dark'),
                },
            });
        }),
    ],
}