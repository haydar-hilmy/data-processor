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
                'secondary-dark': "#1E1E1E",
                'btn-primary': "#1d4ed8", // bg-blue-700
                'btn-secondary': "#1e1e1e",
                'btn-disabled': "#1e1e1e9c",
                'btn-special': '#581c87', // purple
                'btn-success': '#156233',
                'btn-error': '#e74c3c',
                'btn-warning': '#b91c1c' // red
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