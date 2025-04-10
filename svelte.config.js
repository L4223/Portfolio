import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            pages: 'build', // Setzt das Build-Verzeichnis auf /public
            assets: 'build', // Setzt das Assets-Verzeichnis auf /public
            fallback: '404.html' // Notwendig für SPA-Routing
        }),
        appDir: 'app',
        prerender: {
            entries: ['*'] // Stellt sicher, dass alle statischen Dateien erfasst werden
        }
    }
};

export default config;