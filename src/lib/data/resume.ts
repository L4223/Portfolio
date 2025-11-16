import { translate, type LocalizedString } from '$lib/i18n';
import { language } from '$lib/stores/language';
import { derived } from 'svelte/store';
import { href } from '$lib/utils';

const title: LocalizedString = { de: 'Lebenslauf', en: 'Resume' };

const resume = href('/pdf/resume.pdf');

const ResumeData = derived(language, ($language) => ({ title: translate(title, $language), resume }));

export default ResumeData;
