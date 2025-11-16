import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Language = 'de' | 'en';

const DEFAULT_LANGUAGE: Language = 'de';

const getInitialLanguage = (): Language => {
        if (!browser) return DEFAULT_LANGUAGE;

        const stored = localStorage.getItem('language') as Language | null;

        return stored === 'en' || stored === 'de' ? stored : DEFAULT_LANGUAGE;
};

export const language = writable<Language>(getInitialLanguage());

language.subscribe((value) => {
        if (!browser) return;

        localStorage.setItem('language', value);
});

export const toggleLanguage = () => {
        language.update((value) => (value === 'de' ? 'en' : 'de'));
};

export const setLanguage = (value: Language) => language.set(value);
