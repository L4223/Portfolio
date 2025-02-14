import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience } from './types';

const title = 'Erfahrung';

const items: Array<Experience> = [
	{
		slug: 'dataport-bachelor',
		company: 'Dataport AöR',
		description: 'Bachelor-Student im Bereich Virtual Reality (VR) und WebGL.',
		contract: ContractType.Internship,
		type: 'XR Entwicklung',
		location: 'Altenholz, Schleswig-Holstein, Deutschland',
		period: { from: new Date(2024, 11, 1) },
		skills: getSkills('VR', 'WebGL'),
		name: 'Bachelor-Student',
		color: 'red',
		links: [],
		logo: Assets.Dataport,
		shortDescription: 'Bachelor-Student im Bereich VR und WebGL.'
	},
	{
		slug: 'dataport-internship',
		company: 'Dataport AöR',
		description: 'Praktikum im Bereich XR Entwicklung mit Fokus auf Virtual Design und Kundenerfahrung.',
		contract: ContractType.Internship,
		type: 'XR Entwicklung',
		location: 'Altenholz, Schleswig-Holstein, Deutschland',
		period: { from: new Date(2024, 8, 1), to: new Date(2024, 10, 30) },
		skills: getSkills('Virtual Design', 'Kundenerfahrung'),
		name: 'Praktikum XR Entwicklung',
		color: 'blue',
		links: [],
		logo: Assets.Dataport,
		shortDescription: 'Praktikum im Bereich XR Entwicklung.'
	},
	{
		slug: 'social-media-manager',
		company: 'Dritter Ort',
		description: 'Verantwortlich für Corporate Social Media und Community Management.',
		contract: ContractType.PartTime,
		type: 'Social Media Management',
		location: 'Kiel, Schleswig-Holstein, Deutschland',
		period: { from: new Date(2023, 9, 1), to: new Date(2024, 11, 30) },
		skills: getSkills('Social Media', 'Community Management'),
		name: 'Social Media-Manager',
		color: 'green',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'Corporate Social Media Management.'
	},
	{
		slug: 'dominos-koordinator',
		company: 'Domino\'s Pizza Deutschland',
		description: 'Koordination und Qualitätssicherung der Lieferanten.',
		contract: ContractType.WorkingStudent,
		type: 'Koordination',
		location: 'Kronshagen, Schleswig-Holstein, Deutschland',
		period: { from: new Date(2021, 0, 1), to: new Date(2023, 11, 30) },
		skills: getSkills('Koordination', 'Qualitätskontrolle'),
		name: 'Koordinator',
		color: 'purple',
		links: [],
		logo: Assets.Dominos,
		shortDescription: 'Koordination und Lieferantenqualität.'
	},
	{
		slug: 'elanco-produktion',
		company: 'Elanco',
		description: 'Mitarbeit in der Produktionstechnik und im Produktionsbetrieb.',
		contract: ContractType.FullTime,
		type: 'Produktion',
		location: 'Kiel, Schleswig-Holstein, Deutschland',
		period: { from: new Date(2021, 1, 1), to: new Date(2021, 8, 30) },
		skills: getSkills('Produktionstechnik', 'Produktionsbetrieb'),
		name: 'Produktionsmitarbeiter',
		color: 'orange',
		links: [],
		logo: Assets.Elanco,
		shortDescription: 'Produktionstechnik und Produktionsbetrieb.'
	},
	{
		slug: 'bayer-it-intern',
		company: 'Bayer',
		description: 'Praktikum im Bereich IT mit Schwerpunkt technischer Support und IT-Infrastruktur.',
		contract: ContractType.Internship,
		type: 'IT Support',
		location: 'Kiel, Schleswig-Holstein, Deutschland',
		period: { from: new Date(2019, 1, 1), to: new Date(2019, 1, 28) },
		skills: getSkills('Technischer Support', 'IT-Infrastruktur'),
		name: 'Praktikant IT',
		color: 'yellow',
		links: [],
		logo: Assets.Bayer,
		shortDescription: 'Technischer Support und IT-Infrastruktur.'
	}
];

const ExperienceData = { title, items };

export default ExperienceData;
