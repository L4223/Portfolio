import { translate, type LocalizedString } from '$lib/i18n';
import { language } from '$lib/stores/language';
import { derived } from 'svelte/store';

const uiCopy: Record<string, LocalizedString> = {
        search: { de: 'Suche', en: 'Search' },
        searchPlaceholder: { de: 'Suche...', en: 'Search...' },
        close: { de: 'Schließen', en: 'Close' },
        dark: { de: 'Dunkel', en: 'Dark' },
        light: { de: 'Hell', en: 'Light' },
        emptyTitle: { de: 'Hmmm...', en: 'Hmm...' },
        emptyMessage: {
                de: 'Der gesuchte Inhalt existiert nicht...',
                en: 'The content you are looking for does not exist...'
        },
        company: { de: 'Unternehmen', en: 'Company' },
        location: { de: 'Standort', en: 'Location' },
        contractType: { de: 'Vertragsart', en: 'Contract Type' },
        dateRange: { de: 'Zeitraum', en: 'Date range' },
        exactDuration: { de: 'Exakte Dauer', en: 'Exact duration' },
        screenshots: { de: 'Screenshots', en: 'Screenshots' },
        relatedItems: { de: 'Verwandte Einträge', en: 'Related items' },
        download: { de: 'Download', en: 'Download' },
        language: { de: 'Sprache', en: 'Language' }
};

const UiText = derived(language, ($language) => {
        const entries = Object.entries(uiCopy).map(([key, value]) => [key, translate(value, $language)]);

        return Object.fromEntries(entries) as Record<keyof typeof uiCopy, string>;
});

export default UiText;
