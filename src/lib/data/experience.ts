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

const contractNames: Record<ContractType, LocalizedString> = {
        [ContractType.FullTime]: { de: 'Vollzeit', en: 'Full-time' },
        [ContractType.PartTime]: { de: 'Teilzeit', en: 'Part-time' },
        [ContractType.SelfEmployed]: { de: 'Selbstständig', en: 'Self-employed' },
        [ContractType.Freelance]: { de: 'Freiberuflich', en: 'Freelance' },
        [ContractType.Contract]: { de: 'Befristet', en: 'Contract' },
        [ContractType.Internship]: { de: 'Praktikum', en: 'Internship' },
        [ContractType.WorkingStudent]: { de: 'Werkstudent', en: 'Working student' }
};

const kiel = { de: 'Kiel, Schleswig-Holstein, Deutschland', en: 'Kiel, Schleswig-Holstein, Germany' };
const altenholz = { de: 'Altenholz, Schleswig-Holstein, Deutschland', en: 'Altenholz, Schleswig-Holstein, Germany' };

// Descriptions are Markdown (rendered on the detail page), kept short like the CV.
const items: Array<LocalizedExperience> = [
        {
                slug: 'dataport-bachelor',
                company: 'Dataport AöR',
                name: { de: 'Bachelor-Praktikum', en: 'Bachelor Internship' },
                type: { de: 'XR- & Webentwicklung', en: 'XR & web development' },
                contract: ContractType.Internship,
                location: altenholz,
                period: { from: new Date(2024, 11, 1), to: new Date(2025, 6, 31) },
                skillSlugs: ['webxr', 'webgl', 'reactjs', 'nodejs', 'mongo', 'figma'],
                color: 'red',
                links: [],
                logo: Assets.Dataport,
                shortDescription: {
                        de: 'Bachelorarbeit bei Dataport: SchoolXR, eine WebXR-Anwendung, mit der Lehrkräfte 3D-Modelle mit Hotspots und Aufgaben für den Unterricht aufbereiten.',
                        en: 'Bachelor thesis at Dataport: SchoolXR, a WebXR app that lets teachers turn 3D models into lessons with hotspots and tasks.'
                },
                description: {
                        de: `Bachelorarbeit **„Konzeption und Umsetzung einer WebXR-Anwendung für den Schulunterricht“** in Kooperation mit Dataport. Ergebnis ist [SchoolXR](/projects/schoolxr).

- Anforderungsanalyse mit Interviews, Personas und User Journeys
- Papierprototypen und UI-Komponentensystem für einen geführten Ablauf
- Umsetzung mit React und \`<model-viewer>\` (WebGL/AR), Express-Backend und MongoDB
- Anbindung an Moodle und die dBildungscloud über LTI 1.3
- Usability-Tests mit Lehrkräften, Ergebnisse flossen in einen zweiten Prototyp ein`,
                        en: `Bachelor thesis **“Design and implementation of a WebXR application for school lessons”** in cooperation with Dataport. The result is [SchoolXR](/projects/schoolxr).

- Requirements analysis with interviews, personas and user journeys
- Paper prototypes and a UI component system for a guided flow
- Built with React and \`<model-viewer>\` (WebGL/AR), an Express back end and MongoDB
- Integration with Moodle and the dBildungscloud via LTI 1.3
- Usability tests with teachers; findings shaped a second prototype`
                }
        },
        {
                slug: 'dataport-internship',
                company: 'Dataport AöR',
                name: { de: 'Praktikum XR-Entwicklung', en: 'XR Development Internship' },
                type: { de: 'XR-Entwicklung', en: 'XR development' },
                contract: ContractType.Internship,
                location: altenholz,
                period: { from: new Date(2024, 8, 1), to: new Date(2024, 10, 30) },
                skillSlugs: ['unity', 'c#', 'vr', 'figma'],
                color: 'blue',
                links: [],
                logo: Assets.Dataport,
                shortDescription: {
                        de: 'Interaktive XR-Anwendungen für Museums- und Kulturkontexte mit Unity und C# – von der UI über Prototypen bis zur Präsentation auf Messen.',
                        en: 'Interactive XR apps for museums and cultural settings with Unity and C# – from UI and prototypes to presenting them at trade fairs.'
                },
                description: {
                        de: `Im XR-Team von Dataport habe ich an immersiven Anwendungen für öffentliche Einrichtungen mitgearbeitet.

- Entwicklung interaktiver XR-Anwendungen für Museums- und Kulturkontexte (Unity, C#)
- Gestaltung und Implementierung nutzerzentrierter UI-Elemente
- Prototyping und Testing von Web-Anwendungen und immersiven XR-Konzepten
- Präsentation und Evaluation der Anwendungen auf Messen und bei Stakeholdern`,
                        en: `In Dataport's XR team I worked on immersive applications for public institutions.

- Developed interactive XR applications for museums and cultural settings (Unity, C#)
- Designed and implemented user-centred UI elements
- Prototyped and tested web applications and immersive XR concepts
- Presented and evaluated the applications at trade fairs and with stakeholders`
                }
        },
        {
                slug: 'social-media-manager',
                company: 'Dritter Ort',
                name: { de: 'Social-Media-Manager', en: 'Social Media Manager' },
                type: { de: 'Social Media & Design', en: 'Social media & design' },
                contract: ContractType.PartTime,
                location: kiel,
                period: { from: new Date(2023, 9, 1), to: new Date(2024, 11, 31) },
                skillSlugs: ['social-media', 'community-management', 'figma'],
                color: 'green',
                links: [],
                logo: Assets.DritterOrt,
                shortDescription: {
                        de: 'Digitaler Markenauftritt für ein Café und eine Bar in Kiel: Website, Instagram, Grafiken und lokale Kooperationen.',
                        en: 'Digital brand presence for a café and bar in Kiel: website, Instagram, graphics and local collaborations.'
                },
                description: {
                        de: `Neben dem Studium habe ich den digitalen Auftritt des Dritten Orts, eines Cafés mit Bar in Kiel, betreut.

- Gestaltung und Pflege des Markenauftritts auf Website und Instagram, inklusive visueller Sprache und UI
- Konzeption und Erstellung grafischer Inhalte für Online-Formate
- Koordination kreativer Projekte und lokaler Kooperationen`,
                        en: `Alongside my studies I looked after the digital presence of Dritter Ort, a café and bar in Kiel.

- Designed and maintained the brand presence on the website and Instagram, including visual language and UI
- Conceived and created graphic content for online formats
- Coordinated creative projects and local collaborations`
                }
        },
        {
                slug: 'dominos-koordinator',
                company: "Domino's Pizza Deutschland",
                name: { de: 'Koordinator', en: 'Coordinator' },
                type: { de: 'Koordination', en: 'Coordination' },
                contract: ContractType.WorkingStudent,
                location: { de: 'Kronshagen, Schleswig-Holstein, Deutschland', en: 'Kronshagen, Schleswig-Holstein, Germany' },
                period: { from: new Date(2021, 0, 1), to: new Date(2023, 11, 30) },
                skillSlugs: ['coordination', 'quality-control'],
                color: 'purple',
                links: [],
                logo: Assets.Dominos,
                shortDescription: {
                        de: 'Koordination und Qualitätssicherung der Lieferanten.',
                        en: 'Coordinating suppliers and ensuring delivery quality.'
                },
                description: {
                        de: 'Verantwortlich für die Koordination der Lieferanten und die Qualitätssicherung der Lieferungen.',
                        en: 'Responsible for coordinating suppliers and ensuring the quality of deliveries.'
                }
        },
        {
                slug: 'elanco-produktion',
                company: 'KVP Pharma+Veterinär Produkte GmbH',
                name: { de: 'Produktionsmitarbeiter', en: 'Production Assistant' },
                type: { de: 'Pharmazeutische Produktion', en: 'Pharmaceutical production' },
                contract: ContractType.FullTime,
                location: kiel,
                period: { from: new Date(2021, 0, 1), to: new Date(2021, 7, 31) },
                skillSlugs: ['production-engineering', 'production-operations'],
                color: 'orange',
                links: [],
                logo: Assets.Elanco,
                shortDescription: {
                        de: 'Pharmazeutische Produktion im Schichtbetrieb unter strengen Qualitäts- und Sicherheitsstandards.',
                        en: 'Pharmaceutical production in shifts under strict quality and safety standards.'
                },
                description: {
                        de: `Vor dem Studium habe ich in der pharmazeutischen Produktion am Standort Kiel gearbeitet.

- Mitarbeit in der pharmazeutischen Produktion unter strengen Qualitäts- und Sicherheitsstandards
- Unterstützung und Überwachung von Produktions- und Fertigungsprozessen
- Umsetzung von Hygiene- und Sicherheitsrichtlinien im Produktionsbereich
- Teamorientierte Koordination von Aufgaben im Schichtbetrieb`,
                        en: `Before university I worked in pharmaceutical production at the Kiel site.

- Worked in pharmaceutical production under strict quality and safety standards
- Supported and monitored production and manufacturing processes
- Applied hygiene and safety regulations in the production area
- Coordinated tasks as a team in shift work`
                }
        },
        {
                slug: 'bayer-it-intern',
                company: 'KVP Pharma+Veterinär Produkte GmbH',
                name: { de: 'Praktikum IT', en: 'IT Intern' },
                type: { de: 'IT-Support', en: 'IT support' },
                contract: ContractType.Internship,
                location: kiel,
                period: { from: new Date(2019, 1, 1), to: new Date(2019, 1, 28) },
                skillSlugs: ['technical-support', 'it-infrastructure'],
                color: 'yellow',
                links: [],
                logo: Assets.Bayer,
                shortDescription: {
                        de: 'Praktikum in der IT-Abteilung: technischer Support und Einblick in die IT-Infrastruktur.',
                        en: 'Internship in the IT department: technical support and a look at the IT infrastructure.'
                },
                description: {
                        de: 'Einmonatiges Praktikum in der IT-Abteilung am Standort Kiel mit Einblicken in technischen Support und IT-Infrastruktur.',
                        en: 'One-month internship in the IT department at the Kiel site, with insights into technical support and IT infrastructure.'
                }
        }
];

const mapExperience = (item: LocalizedExperience, lang: Language): Experience => ({
        ...item,
        name: translate(item.name, lang),
        description: translate(item.description, lang),
        type: translate(item.type, lang),
        location: translate(item.location, lang),
        shortDescription: translate(item.shortDescription, lang),
        // display label; the enum values are English only
        contract: translate(contractNames[item.contract], lang) as ContractType,
        skills: getLocalizedSkills(lang, ...item.skillSlugs)
});

const ExperienceData = derived(language, ($language) => ({
        title: translate(title, $language),
        items: items.map((item) => mapExperience(item, $language))
}));

export default ExperienceData;
