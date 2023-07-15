/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fade-in 3s ease-in-out',
                'fade-out': 'fade-out 3s ease-in-out',
            },
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        visibility: 'hidden',
                        'pointer-events': 'none',
                        'will-change': 'opacity, transform',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        'transition-property': 'opacity, transform',
                        'transition-duration': '0.3s, 0.3s',
                        'transition-timing-function': 'ease, ease',
                        'transition-timing': 'ease, ease',
                    },
                    '100%': {
                        opacity: '1',
                        visibility: 'visible',
                        'pointer-events': 'auto',
                        'will-change': 'opacity, transform',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        'transition-property': 'opacity, transform',
                        'transition-duration': '0.3s, 0.3s',
                        'transition-timing-function': 'ease, ease',
                        'transition-timing': 'ease, ease',
                    },
                },

                'fade-out': {
                    '0%': {
                        opacity: '1',
                        visibility: 'visible',
                        'pointer-events': 'auto',
                        'will-change': 'opacity, transform',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        'transition-property': 'opacity, transform',
                        'transition-duration': '0.3s, 0.3s',
                        'transition-timing-function': 'ease, ease',
                    },
                    '100%': {
                        opacity: '0',
                        visibility: 'hidden',
                        'pointer-events': 'none',
                        'will-change': 'opacity, transform',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        'transition-property': 'opacity, transform',
                        'transition-duration': '0.3s, 0.3s',
                        'transition-timing-function': 'ease, ease',
                    },
                },
            },
        },
    },
    plugins: [],
};
