import { translate, type LocalizedString } from '$lib/i18n';
import { language } from '$lib/stores/language';
import { derived, type Readable } from 'svelte/store';
import BaseData from './base';
import { getLocalizedSkills } from './skills';
import type { Skill } from './types';

const title: LocalizedString = { de: 'Home', en: 'Home' };

type HeroLink = { label: string; href: string; icon: `i-carbon-${string}` };

const hero = {
        title: `${BaseData.fullName},`,
        description: {
                de: 'Ich liebe es, kreative digitale Lösungen zu bauen – ob Web, XR oder einfach coole Projekte. Schau dich gerne um!',
                en: 'I love building creative digital solutions—whether that is the web, XR, or just cool side projects. Feel free to take a look around!'
        } satisfies LocalizedString,
        links: [
                { label: 'GitHub', href: 'https://github.com/L4223', icon: 'i-carbon-logo-github' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lasse-knodt-63a4092ba/', icon: 'i-carbon-logo-linkedin' },
                { label: 'Email', href: 'mailto:lasse.knodt@online.de', icon: 'i-carbon-at' }
        ] satisfies Array<HeroLink>
};

type Hero = { title: string; description: string; links: Array<HeroLink> };

const HomeData: Readable<{ title: string; hero: Hero; carousel: Array<Skill> }> = derived(language, ($language) => ({
        title: translate(title, $language),
        hero: { ...hero, description: translate(hero.description, $language) },
        carousel: getLocalizedSkills($language)
}));

export default HomeData;
