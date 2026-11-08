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
                de: 'Ich bin Medieningenieur (B.Eng.) und baue Web-Anwendungen, die schnell, zugänglich und angenehm zu benutzen sind – und bringe 3D, AR und KI dorthin, wo sie echten Nutzen stiften. Gerade suche ich eine Stelle als Junior Frontend- oder Fullstack-Entwickler.',
                en: 'I am a media engineer (B.Eng.) building web apps that are fast, accessible and pleasant to use – and I bring 3D, AR and AI to where they add real value. I am currently looking for a junior frontend or full-stack developer role.'
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
