import Assets from './assets';
import type { Education } from './types';

const title = 'Bildung';

const items: Array<Education> = [
	{
		degree: 'Abitur',
		description: '',
		location: 'Altenholz, Deutschland',
		logo: Assets.Unknown,
		name: '',
		organization: 'Gymnasium Altenholz',
		period: { from: new Date(2012, 0, 1), to: new Date(2020, 5, 1) },
		shortDescription: '',
		slug: 'dummy-education-item',
		subjects: ['Biologie', 'Chemie', 'BYOD']
	},
	{
		degree: 'Bachelor of Engineering',
		description: '',
		location: 'Kiel, Deutschland',
		logo: Assets.Unknown,
		name: 'Medieningenieur',
		organization: 'Fachhochschule Kiel',
		period: { from: new Date(2021, 0, 1), to: new Date(2025, 5, 1) },
		shortDescription: '',
		slug: 'dummy-education-item-2',
		subjects: ['Informatik', 'Softwareentwicklung', 'Java Script', 'Python', 'C#', 'UX/UI Design']
	}
];

const EducationData = { title, items };

export default EducationData;
