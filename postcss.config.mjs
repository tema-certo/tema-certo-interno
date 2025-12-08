import postcssCustomMedia from 'postcss-custom-media';

const config = {
    plugins: {
        '@tailwindcss/postcss': {},
        'postcss-custom-media': postcssCustomMedia({
            files: ['src/app/medias.css'],
        }),
    },
};

export default config;
