import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
        './src/features/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                'custom-black': '#101010',
                'custom-cyanBlue': '#13b6dc',
                'custom-white': '#ebebeb',
            },
            boxShadow: {
                whiteShadow: '0px 0px 5px rgb(255, 255, 255, 0.5)',
            },
        },
    },
    plugins: [],
};
export default config;
