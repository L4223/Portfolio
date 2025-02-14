import type { Skill, SkillCategory } from './types';
import type { StringWithAutoComplete } from '@riadh-adrani/utils';
import { omit } from '@riadh-adrani/utils';
import Assets from './assets';
import svelteMd from './md/svelte.md?raw';

const defineSkillCategory = <S extends string>(data: SkillCategory<S>): SkillCategory<S> => data;

const categories = [
	defineSkillCategory({ name: 'Programming Languages', slug: 'pro-lang' }),
	defineSkillCategory({ name: 'Frameworks', slug: 'framework' }),
	defineSkillCategory({ name: 'Libraries', slug: 'library' }),
	defineSkillCategory({ name: 'Languages', slug: 'lang' }),
	defineSkillCategory({ name: 'Databases', slug: 'db' }),
	defineSkillCategory({ name: 'ORMs', slug: 'orm' }),
	defineSkillCategory({ name: 'DevOps', slug: 'devops' }),
	defineSkillCategory({ name: 'Testing', slug: 'test' }),
	defineSkillCategory({ name: 'Dev Tools', slug: 'devtools' }),
	defineSkillCategory({ name: 'Markup & Style', slug: 'markup-style' }),
	defineSkillCategory({ name: 'Design', slug: 'design' }),
	defineSkillCategory({ name: 'Soft Skills', slug: 'soft' })
] as const;

const defineSkill = <S extends string>(
	skill: Omit<Skill<S>, 'category'> & {
		category?: StringWithAutoComplete<(typeof categories)[number]['slug']>;
	}
): Skill<S> => {
	const out: Skill<S> = omit(skill, 'category');

	if (skill.category) {
		out.category = categories.find((it) => it.slug === skill.category);
	}

	return out;
};

export const getSkills = (
	...slugs: Array<StringWithAutoComplete<(typeof items)[number]['slug']>>
): Array<Skill> => {
	return items.filter((it) => (slugs.length === 0 ? true : slugs.includes(it.slug)));
};

export const groupByCategory = (
	query: string
): Array<{ category: SkillCategory; items: Array<Skill> }> => {
	const out: ReturnType<typeof groupByCategory> = [];

	const others: Array<Skill> = [];

	items.forEach((item) => {
		if (query.trim() && !item.name.toLowerCase().includes(query.trim().toLowerCase())) return;

		// push to others if item does not have a category
		if (!item.category) {
			others.push(item);
			return;
		}

		// check if category exists
		let category = out.find((it) => it.category.slug === item.category?.slug);

		if (!category) {
			category = { items: [], category: item.category };

			out.push(category);
		}

		category.items.push(item);
	});

	if (others.length !== 0) {
		out.push({ category: { name: 'Others', slug: 'others' }, items: others });
	}

	return out;
};

const title = 'Skills';

const items = [
	defineSkill({
		slug: 'js',
		color: 'yellow',
		description:
			'JavaScript ist eine vielseitige Programmiersprache für Webentwicklung.',
		logo: Assets.JavaScript,
		name: 'JavaScript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'ts',
		color: 'blue',
		description:
			'TypeScript ist eine typsichere Variante von JavaScript.',
		logo: Assets.TypeScript,
		name: 'TypeScript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'css',
		color: 'blue',
		description:
			'CSS ist eine Stylesheet-Sprache zur Gestaltung von Webinhalten.',
		logo: Assets.CSS,
		name: 'CSS',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'html',
		color: 'orange',
		description:
			'HTML ist eine Auszeichnungssprache zur Strukturierung von Webinhalten.',
		logo: Assets.HTML,
		name: 'HTML',
		category: 'markup-style'
	}),

	defineSkill({
		slug: 'reactjs',
		color: 'cyan',
		description:
			'React.js ist eine JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen.',
		logo: Assets.ReactJs,
		name: 'React.js',
		category: 'library'
	}),
	defineSkill({
		slug: 'svelte',
		color: 'orange',
		description: svelteMd,
		logo: Assets.Svelte,
		name: 'Svelte',
		category: 'library'
	}),
	defineSkill({
		slug: 'nodejs',
		color: 'green',
		description:
			'Node.js ist eine JavaScript-Laufzeitumgebung, die serverseitige Anwendungen ermöglicht.',
		logo: Assets.NodeJs,
		name: 'Node.js',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'flutter',
		color: 'blue',
		description:
			'Flutter ist ein Framework zur plattformübergreifenden App-Entwicklung.',
		logo: Assets.Flutter,
		name: 'Flutter',
		category: 'framework'
	}),
	defineSkill({
		slug: 'firebase',
		color: 'orange',
		description:
			'Firebase bietet Backend-Dienste wie Authentifizierung und Datenbanken.',
		logo: Assets.Firebase,
		name: 'Firebase',
		category: 'db'
	}),
	defineSkill({
		slug: 'git',
		color: 'orange',
		description:
			'Git ist ein Versionskontrollsystem zur Verwaltung von Quellcode.',
		logo: Assets.Git,
		name: 'Git',
		category: 'devtools'
	}),
	defineSkill({
		slug: 'figma',
		color: 'purple',
		description:
			'Figma ist ein webbasiertes Design- und Prototyping-Tool.',
		logo: Assets.Figma,
		name: 'Figma',
		category: 'design'
	}),
	defineSkill({
		slug: 'docker',
		color: 'blue',
		description:
			'Docker ist eine Plattform zur Erstellung und Verwaltung von Containern.',
		logo: Assets.Docker,
		name: 'Docker',
		category: 'devops'
	}),
	defineSkill({
		slug: 'kubernetes',
		color: 'lightblue',
		description:
			'Kubernetes ist eine Open-Source-Plattform zur Verwaltung von Container-Orchestrierungen.',
		logo: Assets.Kubernetes,
		name: 'Kubernetes',
		category: 'devops'
	}),
	defineSkill({
		slug: 'mongo',
		color: 'green',
		description:
			'MongoDB ist eine NoSQL-Datenbank, die JSON-ähnliche Dokumente speichert.',
		logo: Assets.MongoDB,
		name: 'MongoDB',
		category: 'db'
	}),
	defineSkill({
		slug: 'python',
		color: 'yellow',
		description:
			'Python ist eine einfach zu erlernende Programmiersprache, die sich in vielen Bereichen verwenden lässt.',
		logo: Assets.Python,
		name: 'Python',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'java',
		color: 'red',
		description:
			'Java ist eine weit verbreitete Programmiersprache für Backend-Entwicklung.',
		logo: Assets.Java,
		name: 'Java',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'unity',
		color: 'blue',
		description:
			'Unity ist eine Gameengine zur Entwicklung von 2D- und 3D-Spielen.',
		logo: Assets.Unity,
		name: 'Unity',
		category: '3d'
	}),
	defineSkill({
		slug: 'c#',
		color: 'purple',
		description:
			'C# ist eine Programmiersprache von Microsoft für die Entwicklung von Windows-Anwendungen aber auch z.B. relevant für Unity.',
		logo: Assets.CSharp,
		name: 'C#',
		category: '3d'
	}),
	defineSkill({
		slug: 'threejs',
		color: 'white',
		description:
			'ThreeJS ist eine JavaScript-Bibliothek zur Erstellung von 3D-Grafiken im Web.',
		logo: Assets.ThreeJS,
		name: 'Three JS',
		category: '3d'
	}),
	defineSkill({
		slug: 'webxr',
		color: 'purple',
		description:
			'WebXR ist eine API zur Erstellung von Virtual- und Augmented-Reality-Erlebnissen im Web.',
		logo: Assets.WebXR,
		name: 'WebXR',
		category: 'library'
	}),
	defineSkill({
		slug: 'javascript',
		color: 'yellow',
		description:
			'JavaScript ist eine vielseitige Programmiersprache für Webentwicklung.',
		logo: Assets.JavaScript,
		name: 'JavaScript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'three.js',
		color: 'white',
		description:
			'ThreeJS ist eine JavaScript-Bibliothek zur Erstellung von 3D-Grafiken im Web.',
		logo: Assets.ThreeJS,
		name: 'Three JS',
		category: '3d'
	}),
] as const;

const SkillsData = {
	title,
	items
};

export default SkillsData;
