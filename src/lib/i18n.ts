import type { Language } from '$lib/stores/language';

export type LocalizedString = Record<Language, string>;

export const translate = (value: LocalizedString, lang: Language): string => value[lang];
