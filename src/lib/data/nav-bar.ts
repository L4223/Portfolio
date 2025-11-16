import { translate, type LocalizedString } from '$lib/i18n';
import { language } from '$lib/stores/language';
import { derived } from 'svelte/store';
import BaseData from './base';

type NavBarItem = {
        title: LocalizedString;
        icon: `i-carbon-${string}`;
        href: string;
};

const left = { title: { de: BaseData.fullName, en: BaseData.fullName } as LocalizedString, icon: 'i-carbon-code' } as const;

const items: Array<NavBarItem> = [
        { title: { de: 'Skills', en: 'Skills' }, icon: 'i-carbon-assembly-cluster', href: '/skills' },
        { title: { de: 'Projekte', en: 'Projects' }, icon: 'i-carbon-cube', href: '/projects' },
        { title: { de: 'Erfahrung', en: 'Experience' }, icon: 'i-carbon-development', href: '/experience' },
        { title: { de: 'Bildung', en: 'Education' }, icon: 'i-carbon-education', href: '/education' },
        { title: { de: 'Lebenslauf', en: 'Resume' }, icon: 'i-carbon-document', href: '/resume' }
];

const NavBarData = derived(language, ($language) => ({
        left: { title: translate(left.title, $language), icon: left.icon },
        items: items.map((item) => ({
                ...item,
                title: translate(item.title, $language)
        }))
}));

export default NavBarData;
