import BaseData from './base';
import { getSkills } from './skills';
import type { Skill } from './types';

const title = 'Home';

const hero: {
	title: string;
	description: string;
	links: Array<{ label: string; href: string; icon: `i-carbon-${string}` }>;
} = {
	title: `${BaseData.fullName},`,
	description:
		'Ich liebe es, kreative digitale Lösungen zu bauen – ob Web, XR oder einfach coole Projekte. Schau dich gerne um!',
	links: [
		{ label: 'GitHub', href: 'https://github.com/L4223', icon: 'i-carbon-logo-github' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/lasse-knodt-63a4092ba/', icon: 'i-carbon-logo-linkedin' },
		{ label: 'Email', href: 'mailto:lasse.knodt@online.de', icon: 'i-carbon-at' }
	]
};

const carousel: Array<Skill> = getSkills();

const HomeData = {
	title,
	hero,
	carousel
};

export default HomeData;
