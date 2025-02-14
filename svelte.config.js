import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        paths: {
            base: '' // Entferne den Base-Pfad, da Vercel dies nicht benötigt
        },
        appDir: 'app'
    }
};

export default config;
