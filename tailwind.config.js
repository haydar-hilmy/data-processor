/** @type {import('tailwindcss').Config} */
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
                primary: ['#30332E']
            },
            backgroundColor: {
                'primary': "#FFFBF3"
            }
        },
    },
    plugins: [],
}