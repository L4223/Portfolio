import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const base = '/Portfolio'; // Repo-Name als Base-Pfad für GitHub Pages

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            pages: 'build', // Setzt das Build-Verzeichnis auf /build
            assets: 'build', // Setzt das Assets-Verzeichnis auf /build
            fallback: '404.html' // Notwendig für SPA-Routing
        }),
        paths: {
            base: process.env.NODE_ENV === 'production' ? base : ''
        },
        appDir: 'app',
		prerender: {
			entries: ['*'] // Stellt sicher, dass alle statischen Dateien erfasst werden
		}
		
    }
};

export default config;