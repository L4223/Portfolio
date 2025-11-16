import type { StringWithAutoComplete } from '@riadh-adrani/utils';
import { omit } from '@riadh-adrani/utils';
import { translate, type LocalizedString } from '$lib/i18n';
import { language as languageStore, type Language } from '$lib/stores/language';
import { derived } from 'svelte/store';
import Assets from './assets';
import svelteMd from './md/svelte.md?raw';
import type { Skill, SkillCategory } from './types';

type LocalizedCategory<S extends string = string> = Omit<SkillCategory<S>, 'name'> & { name: LocalizedString };
type LocalizedSkill<S extends string = string> = Omit<Skill<S>, 'name' | 'description' | 'category'> & {
        name: LocalizedString;
        description: LocalizedString;
        category?: LocalizedCategory;
};

const defineSkillCategory = <S extends string>(data: LocalizedCategory<S>): LocalizedCategory<S> => data;

const categories = [
        defineSkillCategory({ name: { de: 'Programmierung', en: 'Programming' }, slug: 'programming' }),
        defineSkillCategory({ name: { de: 'Frontend', en: 'Frontend' }, slug: 'frontend' }),
        defineSkillCategory({ name: { de: 'Backend', en: 'Backend' }, slug: 'backend' }),
        defineSkillCategory({ name: { de: 'Game & 3D', en: 'Game & 3D' }, slug: 'game-3d' })
] as const;

const defineSkill = <S extends string>(
        skill: Omit<LocalizedSkill<S>, 'category'> & {
                category?: StringWithAutoComplete<(typeof categories)[number]['slug']>;
        }
): LocalizedSkill<S> => {
        const out: LocalizedSkill<S> = omit(skill, 'category');

        if (skill.category) {
                out.category = categories.find((it) => it.slug === skill.category);
        }

        return out;
};

const title: LocalizedString = { de: 'Skills', en: 'Skills' };

const items = [
        defineSkill({
                slug: 'js',
                color: 'yellow',
                description: {
                        de: 'JavaScript ist eine vielseitige Programmiersprache für Webentwicklung.',
                        en: 'JavaScript is a versatile programming language for web development.'
                },
                logo: Assets.JavaScript,
                name: { de: 'JavaScript', en: 'JavaScript' },
                category: 'programming'
        }),
        defineSkill({
                slug: 'ts',
                color: 'blue',
                description: {
                        de: 'TypeScript ist eine typsichere Variante von JavaScript.',
                        en: 'TypeScript is a typed superset of JavaScript.'
                },
                logo: Assets.TypeScript,
                name: { de: 'TypeScript', en: 'TypeScript' },
                category: 'programming'
        }),
        defineSkill({
                slug: 'python',
                color: 'yellow',
                description: {
                        de: 'Python ist eine einfach zu erlernende Programmiersprache, die sich in vielen Bereichen verwenden lässt.',
                        en: 'Python is easy to learn and useful across many domains.'
                },
                logo: Assets.Python,
                name: { de: 'Python', en: 'Python' },
                category: 'programming'
        }),
        defineSkill({
                slug: 'java',
                color: 'red',
                description: {
                        de: 'Java ist eine weit verbreitete Programmiersprache für Backend-Entwicklung.',
                        en: 'Java is a widely adopted language for backend development.'
                },
                logo: Assets.Java,
                name: { de: 'Java', en: 'Java' },
                category: 'programming'
        }),
        defineSkill({
                slug: 'c#',
                color: 'purple',
                description: {
                        de: 'C# ist eine Programmiersprache von Microsoft für die Entwicklung von Windows-Anwendungen aber auch z.B. relevant für Unity.',
                        en: 'C# is a Microsoft language for Windows applications and popular in Unity projects.'
                },
                logo: Assets.CSharp,
                name: { de: 'C#', en: 'C#' },
                category: 'programming'
        }),

        defineSkill({
                slug: 'html',
                color: 'orange',
                description: {
                        de: 'HTML ist eine Auszeichnungssprache zur Strukturierung von Webinhalten.',
                        en: 'HTML is a markup language for structuring web content.'
                },
                logo: Assets.HTML,
                name: { de: 'HTML', en: 'HTML' },
                category: 'frontend'
        }),
        defineSkill({
                slug: 'css',
                color: 'blue',
                description: {
                        de: 'CSS ist eine Stylesheet-Sprache zur Gestaltung von Webinhalten.',
                        en: 'CSS is a stylesheet language used to style web content.'
                },
                logo: Assets.CSS,
                name: { de: 'CSS', en: 'CSS' },
                category: 'frontend'
        }),
        defineSkill({
                slug: 'nextjs',
                color: 'white',
                description: {
                        de: 'Next.js ist ein leistungsstarkes, Open-Source React-Framework für die Erstellung von hochperformanten und suchmaschinenoptimierten (SEO-freundlichen) Webanwendungen.',
                        en: 'Next.js is a powerful open-source React framework for performant, SEO-friendly web apps.'
                },
                logo: Assets.NextJS,
                name: { de: 'Next.js', en: 'Next.js' },
                category: 'frontend'
        }),
        defineSkill({
                slug: 'reactjs',
                color: 'cyan',
                description: {
                        de: 'React.js ist eine JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen.',
                        en: 'React.js is a JavaScript library for building user interfaces.'
                },
                logo: Assets.ReactJs,
                name: { de: 'React.js', en: 'React.js' },
                category: 'frontend'
        }),
        defineSkill({
                slug: 'svelte',
                color: 'orange',
                description: { de: svelteMd, en: svelteMd },
                logo: Assets.Svelte,
                name: { de: 'Svelte', en: 'Svelte' },
                category: 'frontend'
        }),
        defineSkill({
                slug: 'flutter',
                color: 'blue',
                description: {
                        de: 'Flutter ist ein Framework zur plattformübergreifenden App-Entwicklung.',
                        en: 'Flutter is a framework for building cross-platform apps.'
                },
                logo: Assets.Flutter,
                name: { de: 'Flutter', en: 'Flutter' },
                category: 'frontend'
        }),
        defineSkill({
                slug: 'figma',
                color: 'purple',
                description: {
                        de: 'Figma ist ein webbasiertes Design- und Prototyping-Tool.',
                        en: 'Figma is a web-based tool for design and prototyping.'
                },
                logo: Assets.Figma,
                name: { de: 'Figma', en: 'Figma' },
                category: 'frontend'
        }),

        defineSkill({
                slug: 'nodejs',
                color: 'green',
                description: {
                        de: 'Node.js ist eine JavaScript-Laufzeitumgebung, die serverseitige Anwendungen ermöglicht.',
                        en: 'Node.js is a JavaScript runtime for building server-side applications.'
                },
                logo: Assets.NodeJs,
                name: { de: 'Node.js', en: 'Node.js' },
                category: 'backend'
        }),
        defineSkill({
                slug: 'firebase',
                color: 'orange',
                description: {
                        de: 'Firebase bietet Backend-Dienste wie Authentifizierung und Datenbanken.',
                        en: 'Firebase provides backend services such as authentication and databases.'
                },
                logo: Assets.Firebase,
                name: { de: 'Firebase', en: 'Firebase' },
                category: 'backend'
        }),
        defineSkill({
                slug: 'mongo',
                color: 'green',
                description: {
                        de: 'MongoDB ist eine NoSQL-Datenbank, die JSON-ähnliche Dokumente speichert.',
                        en: 'MongoDB is a NoSQL database storing JSON-like documents.'
                },
                logo: Assets.MongoDB,
                name: { de: 'MongoDB', en: 'MongoDB' },
                category: 'backend'
        }),
        defineSkill({
                slug: 'docker',
                color: 'blue',
                description: {
                        de: 'Docker ist eine Plattform zur Erstellung und Verwaltung von Containern.',
                        en: 'Docker is a platform for building and managing containers.'
                },
                logo: Assets.Docker,
                name: { de: 'Docker', en: 'Docker' },
                category: 'backend'
        }),
        defineSkill({
                slug: 'kubernetes',
                color: 'lightblue',
                description: {
                        de: 'Kubernetes ist eine Open-Source-Plattform zur Verwaltung von Container-Orchestrierungen.',
                        en: 'Kubernetes is an open-source platform for container orchestration.'
                },
                logo: Assets.Kubernetes,
                name: { de: 'Kubernetes', en: 'Kubernetes' },
                category: 'backend'
        }),
        defineSkill({
                slug: 'git',
                color: 'orange',
                description: {
                        de: 'Git ist ein Versionskontrollsystem zur Verwaltung von Quellcode.',
                        en: 'Git is a version control system for managing source code.'
                },
                logo: Assets.Git,
                name: { de: 'Git', en: 'Git' },
                category: 'backend'
        }),

        defineSkill({
                slug: 'unity',
                color: 'blue',
                description: {
                        de: 'Unity ist eine Gameengine zur Entwicklung von 2D- und 3D-Spielen.',
                        en: 'Unity is a game engine for developing 2D and 3D games.'
                },
                logo: Assets.Unity,
                name: { de: 'Unity', en: 'Unity' },
                category: 'game-3d'
        }),
        defineSkill({
                slug: 'threejs',
                color: 'white',
                description: {
                        de: 'ThreeJS ist eine JavaScript-Bibliothek zur Erstellung von 3D-Grafiken im Web.',
                        en: 'ThreeJS is a JavaScript library for building 3D graphics on the web.'
                },
                logo: Assets.ThreeJS,
                name: { de: 'Three JS', en: 'Three JS' },
                category: 'game-3d'
        }),
        defineSkill({
                slug: 'webxr',
                color: 'purple',
                description: {
                        de: 'WebXR ist eine API zur Erstellung von Virtual- und Augmented-Reality-Erlebnissen im Web.',
                        en: 'WebXR is an API for creating virtual and augmented reality experiences on the web.'
                },
                logo: Assets.WebXR,
                name: { de: 'WebXR', en: 'WebXR' },
                category: 'game-3d'
        }),
        defineSkill({
                slug: 'vr',
                color: 'purple',
                description: {
                        de: 'Virtual-Reality-Entwicklung für immersive Anwendungen.',
                        en: 'Virtual reality development for immersive experiences.'
                },
                logo: Assets.WebXR,
                name: { de: 'VR', en: 'VR' },
                category: 'game-3d'
        }),
        defineSkill({
                slug: 'webgl',
                color: 'teal',
                description: {
                        de: 'WebGL ermöglicht hardwarebeschleunigte 3D-Grafik direkt im Browser.',
                        en: 'WebGL enables hardware-accelerated 3D graphics directly in the browser.'
                },
                logo: Assets.ThreeJS,
                name: { de: 'WebGL', en: 'WebGL' },
                category: 'game-3d'
        }),
        defineSkill({
                slug: 'ai',
                color: 'blue',
                description: {
                        de: 'Künstliche Intelligenz und deren Einsatz in Projekten.',
                        en: 'Artificial intelligence concepts applied in projects.'
                },
                logo: Assets.Python,
                name: { de: 'AI', en: 'AI' },
                category: 'programming'
        }),
        defineSkill({
                slug: 'pulse-tracking',
                color: 'red',
                description: {
                        de: 'Pulsmessung und Integration biometrischer Daten.',
                        en: 'Heart-rate tracking and biometric data integration.'
                },
                logo: Assets.Unknown,
                name: { de: 'Pulstracking', en: 'Pulse Tracking' },
                category: 'game-3d'
        }),
        defineSkill({
                slug: 'voice-tracking',
                color: 'indigo',
                description: {
                        de: 'Sprachanalyse zur Erkennung von Füllwörtern und Tonlage.',
                        en: 'Voice analysis to capture filler words and tone.'
                },
                logo: Assets.Unknown,
                name: { de: 'Voicetracking', en: 'Voice Tracking' },
                category: 'game-3d'
        }),
        defineSkill({
                slug: 'virtual-design',
                color: 'pink',
                description: {
                        de: 'Virtuelle Gestaltung von Produkten und Erlebnissen.',
                        en: 'Virtual design for products and experiences.'
                },
                logo: Assets.Figma,
                name: { de: 'Virtual Design', en: 'Virtual Design' }
        }),
        defineSkill({
                slug: 'customer-experience',
                color: 'green',
                description: {
                        de: 'Gestaltung positiver Kundenerfahrungen in digitalen Produkten.',
                        en: 'Designing positive customer experiences in digital products.'
                },
                logo: Assets.Unknown,
                name: { de: 'Kundenerfahrung', en: 'Customer Experience' }
        }),
        defineSkill({
                slug: 'social-media',
                color: 'blue',
                description: {
                        de: 'Strategische Planung und Umsetzung von Social-Media-Inhalten.',
                        en: 'Strategic planning and execution of social media content.'
                },
                logo: Assets.Unknown,
                name: { de: 'Social Media', en: 'Social Media' }
        }),
        defineSkill({
                slug: 'community-management',
                color: 'teal',
                description: {
                        de: 'Aufbau und Pflege aktiver Communities.',
                        en: 'Building and nurturing active communities.'
                },
                logo: Assets.Unknown,
                name: { de: 'Community Management', en: 'Community Management' }
        }),
        defineSkill({
                slug: 'coordination',
                color: 'purple',
                description: {
                        de: 'Koordination von Teams und Abläufen.',
                        en: 'Coordinating teams and processes.'
                },
                logo: Assets.Unknown,
                name: { de: 'Koordination', en: 'Coordination' }
        }),
        defineSkill({
                slug: 'quality-control',
                color: 'orange',
                description: {
                        de: 'Qualitätssicherung und kontinuierliche Verbesserung.',
                        en: 'Quality assurance and continuous improvement.'
                },
                logo: Assets.Unknown,
                name: { de: 'Qualitätskontrolle', en: 'Quality Control' }
        }),
        defineSkill({
                slug: 'production-engineering',
                color: 'yellow',
                description: {
                        de: 'Produktionstechnik und Prozessoptimierung.',
                        en: 'Production engineering and process optimization.'
                },
                logo: Assets.Unknown,
                name: { de: 'Produktionstechnik', en: 'Production Engineering' }
        }),
        defineSkill({
                slug: 'production-operations',
                color: 'gray',
                description: {
                        de: 'Operativer Produktionsbetrieb und Anlagenbetreuung.',
                        en: 'Operational production work and plant support.'
                },
                logo: Assets.Unknown,
                name: { de: 'Produktionsbetrieb', en: 'Production Operations' }
        }),
        defineSkill({
                slug: 'technical-support',
                color: 'blue',
                description: {
                        de: 'Technischer Support für Anwender und Systeme.',
                        en: 'Technical support for users and systems.'
                },
                logo: Assets.Unknown,
                name: { de: 'Technischer Support', en: 'Technical Support' }
        }),
        defineSkill({
                slug: 'it-infrastructure',
                color: 'navy',
                description: {
                        de: 'Aufbau und Betreuung von IT-Infrastrukturen.',
                        en: 'Building and maintaining IT infrastructure.'
                },
                logo: Assets.Unknown,
                name: { de: 'IT-Infrastruktur', en: 'IT Infrastructure' }
        }),
        defineSkill({
                slug: 'scrum',
                color: 'green',
                description: {
                        de: 'Agile Projektsteuerung mit Scrum.',
                        en: 'Agile project management with Scrum.'
                },
                logo: Assets.Unknown,
                name: { de: 'Scrum', en: 'Scrum' }
        }),
        defineSkill({
                slug: 'full-stack',
                color: 'cyan',
                description: {
                        de: 'Entwicklung über Frontend und Backend hinweg.',
                        en: 'Development across frontend and backend.'
                },
                logo: Assets.Unknown,
                name: { de: 'Full-Stack', en: 'Full-Stack' }
        })
] as const;

const resolveCategory = (slug: string, lang: Language): SkillCategory => {
        const category = categories.find((it) => it.slug === slug);

        if (!category) {
                return { name: translate({ de: 'Andere', en: 'Others' }, lang), slug };
        }

        return { ...category, name: translate(category.name, lang) };
};

const mapSkill = (skill: LocalizedSkill, lang: Language): Skill => {
        return {
                ...skill,
                name: translate(skill.name, lang),
                description: translate(skill.description, lang),
                category: skill.category ? resolveCategory(skill.category.slug, lang) : undefined
        };
};

export const getLocalizedSkills = (
        lang: Language,
        ...slugs: Array<StringWithAutoComplete<(typeof items)[number]['slug']>>
): Array<Skill> => {
        return items
                .filter((it) => (slugs.length === 0 ? true : slugs.includes(it.slug)))
                .map((it) => mapSkill(it, lang));
};

export const groupByCategory = (
        lang: Language,
        list: Array<Skill>,
        query: string
): Array<{ category: SkillCategory; items: Array<Skill> }> => {
        const out: ReturnType<typeof groupByCategory> = [];

        const others: Array<Skill> = [];

        list.forEach((item) => {
                if (query.trim() && !item.name.toLowerCase().includes(query.trim().toLowerCase())) return;

                if (!item.category) {
                        others.push(item);
                        return;
                }

                let category = out.find((it) => it.category.slug === item.category?.slug);

                if (!category) {
                        category = { items: [], category: resolveCategory(item.category.slug, lang) };

                        out.push(category);
                }

                category.items.push(item);
        });

        if (others.length !== 0) {
                out.push({ category: resolveCategory('others', lang), items: others });
        }

        return out;
};

const SkillsData = derived(languageStore, ($language) => ({
        title: translate(title, $language),
        items: getLocalizedSkills($language)
}));

export default SkillsData;
