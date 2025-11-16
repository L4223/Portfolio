import { translate, type LocalizedString } from '$lib/i18n';
import { language, type Language } from '$lib/stores/language';
import { derived } from 'svelte/store';
import Assets from './assets';
import { getLocalizedSkills } from './skills';
import { ContractType, type Experience } from './types';

type LocalizedExperience = Omit<Experience, 'name' | 'description' | 'type' | 'location' | 'shortDescription' | 'skills'> & {
        name: LocalizedString;
        description: LocalizedString;
        type: LocalizedString;
        location: LocalizedString;
        shortDescription: LocalizedString;
        skillSlugs: Array<string>;
};

const title: LocalizedString = { de: 'Erfahrung', en: 'Experience' };

const items: Array<LocalizedExperience> = [
        {
                slug: 'dataport-bachelor',
                company: 'Dataport AöR',
                description: {
                        de: 'Bachelor-Student im Bereich Virtual Reality (VR) und WebGL.',
                        en: 'Bachelor student focusing on Virtual Reality (VR) and WebGL.'
                },
                contract: ContractType.Internship,
                type: { de: 'XR Entwicklung', en: 'XR Development' },
                location: { de: 'Altenholz, Schleswig-Holstein, Deutschland', en: 'Altenholz, Schleswig-Holstein, Germany' },
                period: { from: new Date(2024, 11, 1) },
                skillSlugs: ['vr', 'webgl'],
                name: { de: 'Bachelor-Student', en: 'Bachelor Student' },
                color: 'red',
                links: [],
                logo: Assets.Dataport,
                shortDescription: {
                        de: 'Bachelor-Student im Bereich VR und WebGL.',
                        en: 'Bachelor student working with VR and WebGL.'
                }
        },
        {
                slug: 'dataport-internship',
                company: 'Dataport AöR',
                description: {
                        de: 'Praktikum im Bereich XR Entwicklung mit Fokus auf Virtual Design und Kundenerfahrung.',
                        en: 'XR development internship focused on virtual design and customer experience.'
                },
                contract: ContractType.Internship,
                type: { de: 'XR Entwicklung', en: 'XR Development' },
                location: { de: 'Altenholz, Schleswig-Holstein, Deutschland', en: 'Altenholz, Schleswig-Holstein, Germany' },
                period: { from: new Date(2024, 8, 1), to: new Date(2024, 10, 30) },
                skillSlugs: ['virtual-design', 'customer-experience'],
                name: { de: 'Praktikum XR Entwicklung', en: 'XR Development Internship' },
                color: 'blue',
                links: [],
                logo: Assets.Dataport,
                shortDescription: { de: 'Praktikum im Bereich XR Entwicklung.', en: 'Internship in XR development.' }
        },
        {
                slug: 'social-media-manager',
                company: 'Dritter Ort',
                description: {
                        de: 'Verantwortlich für Corporate Social Media und Community Management.',
                        en: 'Responsible for corporate social media and community management.'
                },
                contract: ContractType.PartTime,
                type: { de: 'Social Media Management', en: 'Social Media Management' },
                location: { de: 'Kiel, Schleswig-Holstein, Deutschland', en: 'Kiel, Schleswig-Holstein, Germany' },
                period: { from: new Date(2023, 9, 1), to: new Date(2024, 11, 30) },
                skillSlugs: ['social-media', 'community-management'],
                name: { de: 'Social Media-Manager', en: 'Social Media Manager' },
                color: 'green',
                links: [],
                logo: Assets.DritterOrt,
                shortDescription: {
                        de: 'Corporate Social Media Management.',
                        en: 'Corporate social media management.'
                }
        },
        {
                slug: 'dominos-koordinator',
                company: "Domino's Pizza Deutschland",
                description: {
                        de: 'Koordination und Qualitätssicherung der Lieferanten.',
                        en: 'Coordinated suppliers and ensured delivery quality.'
                },
                contract: ContractType.WorkingStudent,
                type: { de: 'Koordination', en: 'Coordination' },
                location: { de: 'Kronshagen, Schleswig-Holstein, Deutschland', en: 'Kronshagen, Schleswig-Holstein, Germany' },
                period: { from: new Date(2021, 0, 1), to: new Date(2023, 11, 30) },
                skillSlugs: ['coordination', 'quality-control'],
                name: { de: 'Koordinator', en: 'Coordinator' },
                color: 'purple',
                links: [],
                logo: Assets.Dominos,
                shortDescription: { de: 'Koordination und Lieferantenqualität.', en: 'Coordination and supplier quality.' }
        },
        {
                slug: 'elanco-produktion',
                company: 'Elanco',
                description: {
                        de: 'Mitarbeit in der Produktionstechnik und im Produktionsbetrieb.',
                        en: 'Worked in production engineering and day-to-day manufacturing.'
                },
                contract: ContractType.FullTime,
                type: { de: 'Produktion', en: 'Production' },
                location: { de: 'Kiel, Schleswig-Holstein, Deutschland', en: 'Kiel, Schleswig-Holstein, Germany' },
                period: { from: new Date(2021, 1, 1), to: new Date(2021, 8, 30) },
                skillSlugs: ['production-engineering', 'production-operations'],
                name: { de: 'Produktionsmitarbeiter', en: 'Production Assistant' },
                color: 'orange',
                links: [],
                logo: Assets.Elanco,
                shortDescription: {
                        de: 'Produktionstechnik und Produktionsbetrieb.',
                        en: 'Production engineering and operations.'
                }
        },
        {
                slug: 'bayer-it-intern',
                company: 'Bayer',
                description: {
                        de: 'Praktikum im Bereich IT mit Schwerpunkt technischer Support und IT-Infrastruktur.',
                        en: 'IT internship focused on technical support and IT infrastructure.'
                },
                contract: ContractType.Internship,
                type: { de: 'IT Support', en: 'IT Support' },
                location: { de: 'Kiel, Schleswig-Holstein, Deutschland', en: 'Kiel, Schleswig-Holstein, Germany' },
                period: { from: new Date(2019, 1, 1), to: new Date(2019, 1, 28) },
                skillSlugs: ['technical-support', 'it-infrastructure'],
                name: { de: 'Praktikant IT', en: 'IT Intern' },
                color: 'yellow',
                links: [],
                logo: Assets.Bayer,
                shortDescription: { de: 'Technischer Support und IT-Infrastruktur.', en: 'Technical support and IT infrastructure.' }
        }
];

const mapExperience = (item: LocalizedExperience, lang: Language): Experience => ({
        ...item,
        name: translate(item.name, lang),
        description: translate(item.description, lang),
        type: translate(item.type, lang),
        location: translate(item.location, lang),
        shortDescription: translate(item.shortDescription, lang),
        skills: getLocalizedSkills(lang, ...item.skillSlugs)
});

const ExperienceData = derived(language, ($language) => ({
        title: translate(title, $language),
        items: items.map((item) => mapExperience(item, $language))
}));

export default ExperienceData;
