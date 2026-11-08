import { translate, type LocalizedString } from '$lib/i18n';
import { language, type Language } from '$lib/stores/language';
import { derived } from 'svelte/store';
import { base } from '$app/paths';
import Assets from './assets';
import { getLocalizedSkills } from './skills';
import type { Link, Project } from './types';

type LocalizedScreenshot = { src: string; label: LocalizedString };
type LocalizedLink = Omit<Link, 'label'> & { label: LocalizedString };

type LocalizedProject = Omit<
	Project,
	'name' | 'description' | 'shortDescription' | 'type' | 'skills' | 'screenshots' | 'links'
> & {
	name: LocalizedString;
	description: LocalizedString;
	shortDescription: LocalizedString;
	type: LocalizedString;
	skillSlugs: Array<string>;
	links: Array<LocalizedLink>;
	screenshots?: Array<LocalizedScreenshot>;
};

const title: LocalizedString = { de: 'Projekte', en: 'Projects' };

const img = (path: string) => `${base}/screenshots/${path}`;

const github = (repo: string): LocalizedLink => ({
	to: `https://github.com/L4223/${repo}`,
	label: { de: 'GitHub', en: 'GitHub' }
});

const figure = (path: string, alt: string) =>
	`<figure><img src="${img(path)}" alt="${alt}" loading="lazy"><figcaption>${alt}</figcaption></figure>`;

const items: Array<LocalizedProject> = [
	{
		slug: 'flut-digital',
		color: '#1C91FF',
		name: { de: 'Flut.digital', en: 'Flut.digital' },
		type: { de: 'Übungsprojekt · Web & Brand', en: 'Practice project · Web & brand' },
		logo: Assets.FlutDigital,
		period: { from: new Date(2025, 8, 29) },
		links: [github('Flut.digital')],
		skillSlugs: ['nextjs', 'reactjs', 'ts', 'tailwind', 'threejs', 'firebase', 'ai'],
		shortDescription: {
			de: 'Marke und Website für eine fiktive Digitalagentur – mit Three.js-Szene, KI-Chat und Admin-Bereich.',
			en: 'Brand and website for a fictional digital agency – with a Three.js scene, AI chat and admin area.'
		},
		description: {
			de: `
			<p class="lead">Flut.digital ist mein Übungsprojekt für Webentwicklung und Brand Design: Ich habe eine fiktive Digitalagentur für Webdesign, KI-Integrationen und 3D/AR-Erlebnisse erfunden und für sie Marke und Website von Grund auf gebaut. Agentur und Inhalte sind ausgedacht, die Technik ist echt.</p>
			${figure('flut-digital/home.jpg', 'Startseite mit animierter Wellen- und Punktwolken-Szene')}
			<h2>Highlights</h2>
			<ul>
				<li><strong>Three.js-Hintergrund:</strong> eine Wellen-Szene im Hero und eine Punktwolke, deren Sterne um den Mauszeiger aufleuchten. Beides mit eigenem Shader, pausiert im Hintergrund-Tab und respektiert <code>prefers-reduced-motion</code>.</li>
				<li><strong>KI-Chat-Assistent:</strong> beantwortet Fragen zu Leistungen und Ablauf über die Groq-API (<code>openai/gpt-oss-120b</code>). Der Key bleibt über Server Actions auf dem Server, Rate-Limits werden freundlich abgefangen.</li>
				<li><strong>Inhalte als Daten:</strong> Leistungen, Referenzen und Tech-Stack liegen typisiert im Code. Die Leistungsseiten erzeugen daraus auch strukturierte Daten (JSON-LD).</li>
				<li><strong>Admin-Bereich:</strong> Blog, Referenzen und Kontaktanfragen werden über Firebase Auth und Firestore gepflegt, abgesichert durch Firestore-Regeln.</li>
				<li><strong>Barrierefreiheit &amp; Performance:</strong> Skip-Link, sichtbarer Tastaturfokus, geprüfte Kontraste, selbst gehostete Schrift und Inhalte, die schon vor dem Laden von JavaScript sichtbar sind.</li>
			</ul>
			${figure('flut-digital/leistung-ki.jpg', 'Leistungsseite mit animierter Illustration, Ablauf und FAQ')}
			<h2>Was ich dabei geübt habe</h2>
			<p>Den kompletten Weg von der Marke bis zur fertigen Seite: Name, Logo und Farbsystem, Informationsarchitektur, Texte, Komponenten mit shadcn/ui und Tailwind, Case Studies mit Geräte-Mockups – und am Ende ein Audit auf Zugänglichkeit und Performance.</p>
			${figure('flut-digital/referenzen.jpg', 'Case Studies mit Desktop- und Mobil-Mockups')}
			<h2>Tech-Stack</h2>
			<p>Next.js 15 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Three.js, Firebase (Firestore, Auth), Groq API.</p>
			`,
			en: `
			<p class="lead">Flut.digital is my practice project for web development and brand design: I invented a fictional digital agency for web design, AI integrations and 3D/AR experiences and built its brand and website from scratch. The agency and its content are made up, the tech is real.</p>
			${figure('flut-digital/home.jpg', 'Home page with animated wave and point-cloud scene')}
			<h2>Highlights</h2>
			<ul>
				<li><strong>Three.js background:</strong> a wave scene in the hero and a point cloud whose stars light up around the cursor. Both use custom shaders, pause in background tabs and respect <code>prefers-reduced-motion</code>.</li>
				<li><strong>AI chat assistant:</strong> answers questions about services and process via the Groq API (<code>openai/gpt-oss-120b</code>). The key stays on the server through Server Actions, and rate limits are handled gracefully.</li>
				<li><strong>Content as data:</strong> services, references and tech stack are typed data in the codebase. The service pages also generate structured data (JSON-LD) from it.</li>
				<li><strong>Admin area:</strong> blog posts, references and contact requests are managed via Firebase Auth and Firestore, protected by Firestore rules.</li>
				<li><strong>Accessibility &amp; performance:</strong> skip link, visible keyboard focus, checked contrast, self-hosted fonts and content that is visible before JavaScript loads.</li>
			</ul>
			${figure('flut-digital/leistung-ki.jpg', 'Service page with animated illustration, process and FAQ')}
			<h2>What I practised</h2>
			<p>The whole path from brand to finished site: name, logo and colour system, information architecture, copy, components with shadcn/ui and Tailwind, case studies with device mock-ups – and finally an accessibility and performance audit.</p>
			${figure('flut-digital/referenzen.jpg', 'Case studies with desktop and mobile mock-ups')}
			<h2>Tech stack</h2>
			<p>Next.js 15 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Three.js, Firebase (Firestore, Auth), Groq API.</p>
			`
		}
	},
	{
		slug: 'schoolxr',
		color: '#6A1B9A',
		name: { de: 'SchoolXR – Bachelorarbeit', en: 'SchoolXR – Bachelor thesis' },
		type: { de: 'Bachelorarbeit mit Dataport', en: 'Bachelor thesis with Dataport' },
		logo: Assets.SchoolXR,
		period: { from: new Date(2025, 3, 1), to: new Date(2025, 5, 30) },
		links: [github('SchoolXR_Prototype')],
		skillSlugs: ['reactjs', 'js', 'tailwind', 'webxr', 'webgl', 'nodejs', 'express', 'mongo'],
		shortDescription: {
			de: 'Lehrkräfte verbinden 3D-Modelle mit Hotspots und Aufgaben, Schüler:innen erkunden sie im Browser – mit LTI-Anbindung für Moodle.',
			en: 'Teachers attach hotspots and tasks to 3D models, students explore them in the browser – with LTI integration for Moodle.'
		},
		description: {
			de: `
			<p class="lead">Meine Bachelorarbeit (B.Eng. Medieningenieurwesen, HAW Kiel) in Kooperation mit Dataport. SchoolXR ist ein webbasiertes Werkzeug, mit dem Lehrkräfte 3D-Modelle mit Erklärungen und Aufgaben verbinden – und Schüler:innen diese direkt im Browser erkunden. Ohne App-Installation und ohne spezielle XR-Hardware, auf PC, Tablet und Smartphone.</p>
			${figure('schoolxr/app-desktop.jpg', 'Startseite mit Rollenwahl')}
			<h2>Das Problem</h2>
			<p>3D und AR können Unterricht anschaulicher machen, scheitern in Schulen aber oft an Hardware, Installationen und Datenschutz. SchoolXR setzt deshalb komplett auf Web-Technologien und ist für die Einbindung in Lernmanagementsysteme wie <strong>Moodle</strong> und die <strong>dBildungscloud</strong> über <strong>LTI 1.3</strong> konzipiert.</p>
			<h2>Funktionen</h2>
			<ul>
				<li><strong>Lehrkräfte</strong> wählen ein Modell aus der Sketchfab-Bibliothek oder laden ein eigenes hoch (glTF/GLB/USDZ), setzen Hotspots direkt am Modell und speichern sie als wiederverwendbare Sammlung.</li>
				<li><strong>Schüler:innen</strong> drehen, zoomen und erkunden das Modell, lesen Erklärungen an den Hotspots, bearbeiten Aufgaben und verfolgen ihren Fortschritt über eine Checkliste.</li>
				<li>Geführter Ablauf: Start → Auswählen → Anpassen → Fertig.</li>
			</ul>
			${figure('schoolxr/flow.jpg', 'Geführter Ablauf: Modell wählen, Hotspots setzen, Vorschau prüfen')}
			<h2>Vorgehen</h2>
			<p>Die Anwendung ist nutzerzentriert entstanden (Human-Centered Design):</p>
			<ul>
				<li><strong>Analyse:</strong> Vergleich bestehender XR-Lösungen, Interviews, drei Personas und User Journeys</li>
				<li><strong>Konzept:</strong> Papierprototypen und ein UI-Komponentensystem</li>
				<li><strong>Umsetzung:</strong> React-Frontend mit <code>&lt;model-viewer&gt;</code> und Express-Backend mit LTI-Anbindung (ltijs)</li>
				<li><strong>Evaluation:</strong> Usability-Tests mit Lehrkräften und eine ergänzende Online-Umfrage; die Ergebnisse flossen in den zweiten Prototyp ein</li>
			</ul>
			${figure('schoolxr/paper-prototype.jpg', 'Papierprototypen')}
			<h2>Tech-Stack</h2>
			<p>React 19, Vite, React Router, Tailwind CSS, Flowbite · <code>&lt;model-viewer&gt;</code> (WebGL/AR) · Sketchfab API · Node.js, Express, ltijs (LTI 1.3) · MongoDB mit Mongoose.</p>
			`,
			en: `
			<p class="lead">My bachelor thesis (B.Eng. Media Engineering, Kiel University of Applied Sciences) in cooperation with Dataport. SchoolXR is a web-based tool that lets teachers attach explanations and tasks to 3D models – and lets students explore them right in the browser. No app install and no special XR hardware, on PC, tablet and phone.</p>
			${figure('schoolxr/app-desktop.jpg', 'Start page with role selection')}
			<h2>The problem</h2>
			<p>3D and AR can make lessons more tangible, but in schools they often fail because of hardware, installs and data protection. SchoolXR therefore relies entirely on web technology and is designed to plug into learning management systems such as <strong>Moodle</strong> and the <strong>dBildungscloud</strong> via <strong>LTI 1.3</strong>.</p>
			<h2>Features</h2>
			<ul>
				<li><strong>Teachers</strong> pick a model from the Sketchfab library or upload their own (glTF/GLB/USDZ), place hotspots directly on the model and save them as a reusable collection.</li>
				<li><strong>Students</strong> rotate, zoom and explore the model, read explanations at the hotspots, work on tasks and track their progress with a checklist.</li>
				<li>Guided flow: Start → Select → Customise → Done.</li>
			</ul>
			${figure('schoolxr/flow.jpg', 'Guided flow: choose a model, place hotspots, check the preview')}
			<h2>Process</h2>
			<p>The app was built following human-centred design:</p>
			<ul>
				<li><strong>Analysis:</strong> comparison of existing XR tools, interviews, three personas and user journeys</li>
				<li><strong>Concept:</strong> paper prototypes and a UI component system</li>
				<li><strong>Implementation:</strong> React front end with <code>&lt;model-viewer&gt;</code> and an Express back end with LTI integration (ltijs)</li>
				<li><strong>Evaluation:</strong> usability tests with teachers plus an online survey; the results shaped the second prototype</li>
			</ul>
			${figure('schoolxr/paper-prototype.jpg', 'Paper prototypes')}
			<h2>Tech stack</h2>
			<p>React 19, Vite, React Router, Tailwind CSS, Flowbite · <code>&lt;model-viewer&gt;</code> (WebGL/AR) · Sketchfab API · Node.js, Express, ltijs (LTI 1.3) · MongoDB with Mongoose.</p>
			`
		},
		screenshots: [
			{ src: img('schoolxr/app-mobile.jpg'), label: { de: 'Mobile Ansicht', en: 'Mobile view' } },
			{ src: img('schoolxr/ui-components.jpg'), label: { de: 'UI-Komponenten', en: 'UI components' } }
		]
	},
	{
		slug: 'portfolio',
		color: '#FF3E00',
		name: { de: 'Portfolio', en: 'Portfolio' },
		type: { de: 'Persönliche Website', en: 'Personal website' },
		logo: Assets.Svelte,
		period: { from: new Date(2025, 1, 14) },
		links: [
			{ to: 'https://portfolio-dbw3.onrender.com', label: { de: 'Live', en: 'Live' } },
			github('Portfolio')
		],
		skillSlugs: ['svelte', 'ts', 'tailwind', 'threejs'],
		shortDescription: {
			de: 'Diese Seite: zweisprachiges Portfolio (DE/EN) mit 3D-Avatar, Suche, Filtern und Dark Mode.',
			en: 'This site: a bilingual portfolio (DE/EN) with a 3D avatar, search, filters and dark mode.'
		},
		description: {
			de: `
			<p class="lead">Die Seite, auf der du gerade bist. Das Grundgerüst stammt aus der Open-Source-Vorlage <a href="https://github.com/RiadhAdrani/slick-portfolio-svelte" target="_blank" rel="noopener">slick-portfolio-svelte</a> (MIT). Darauf aufbauend habe ich die Zweisprachigkeit, den 3D-Avatar, die Lebenslauf-Seite, eigene Logos und sämtliche Inhalte ergänzt.</p>
			<h2>Funktionen</h2>
			<ul>
				<li><strong>Zweisprachig:</strong> Umschalter DE/EN, alle Inhalte liegen lokalisiert als Daten vor</li>
				<li><strong>3D-Avatar</strong> auf der Startseite: ein eigenes glTF-Modell, gerendert mit Three.js über Threlte</li>
				<li><strong>Projekte, Skills, Erfahrung und Ausbildung</strong> mit Detailseiten, Suche und Filter nach Technologien</li>
				<li><strong>Lebenslauf</strong> mit PDF-Vorschau und Download, Dark und Light Mode</li>
				<li>Statischer Build mit SvelteKit <code>adapter-static</code></li>
			</ul>
			`,
			en: `
			<p class="lead">The site you are looking at. The scaffold comes from the open-source template <a href="https://github.com/RiadhAdrani/slick-portfolio-svelte" target="_blank" rel="noopener">slick-portfolio-svelte</a> (MIT). On top of it I added bilingual content, the 3D avatar, the resume page, custom logos and all of the content.</p>
			<h2>Features</h2>
			<ul>
				<li><strong>Bilingual:</strong> DE/EN toggle, all content is stored as localised data</li>
				<li><strong>3D avatar</strong> on the home page: a custom glTF model rendered with Three.js via Threlte</li>
				<li><strong>Projects, skills, experience and education</strong> with detail pages, search and technology filters</li>
				<li><strong>Resume</strong> with PDF preview and download, dark and light mode</li>
				<li>Static build with SvelteKit <code>adapter-static</code></li>
			</ul>
			`
		}
	},
	{
		slug: 'big-speech-vr',
		color: '#4A90E2',
		name: { de: 'Big Speech VR', en: 'Big Speech VR' },
		type: { de: 'VR-Anwendung', en: 'VR application' },
		logo: Assets.BigSpeechVR,
		period: { from: new Date(2024, 0, 1), to: new Date(2024, 3, 15) },
		links: [],
		skillSlugs: ['unity', 'c#', 'vr', 'ai', 'pulse-tracking', 'voice-tracking'],
		shortDescription: {
			de: 'VR-Präsentationstrainer: vor virtuellem Publikum üben und Feedback zu Puls, Füllwörtern und Dauer erhalten.',
			en: 'VR presentation trainer: rehearse in front of a virtual audience and get feedback on pulse, filler words and duration.'
		},
		description: {
			de: `
			<p class="lead">Big Speech VR ist ein virtueller Präsentationstrainer, entwickelt in Unity. Nutzer:innen importieren ihre eigenen Folien und präsentieren vor einem animierten, interaktiven Publikum – die App misst dabei, wie es läuft.</p>
			${figure('bigspeechvr1.png', 'Präsentieren vor virtuellem Publikum')}
			<h2>Funktionen</h2>
			<ul>
				<li><strong>Präsentationsimport:</strong> eigene Folien und Stichwörter als Textdatei laden</li>
				<li><strong>Feature-Auswahl:</strong> interaktives Publikum, Pulstracking und Voicetracking vor dem Start zuschalten</li>
				<li><strong>Präsentationsmodus:</strong> vor einem animierten NPC-Publikum in einem virtuellen Studio sprechen</li>
				<li><strong>Feedback:</strong> Auswertung von Puls, Füllwörtern, Nutzung der Stichpunkte und Gesamtdauer</li>
				<li><strong>Verlauf:</strong> aktuelle Durchläufe mit früheren Versuchen vergleichen</li>
			</ul>
			<h2>Technik</h2>
			<p>Eigene 3D-Modelle für Studio, Tutorial und Handmenü, eigene C#-Skripte für Datenverarbeitung, NPC-Reaktionen und Präsentationslogik. Hyperate liefert die Pulsdaten, wit.ai erkennt Füllwörter. Die VR-Grundlage bilden OpenXR, XR Core Utilities und TextMeshPro.</p>
			<h2>Herausforderungen</h2>
			<p>Mehrere SDKs zusammenzubringen und die Interaktion mit der VR-Hardware flüssig zu halten war anspruchsvoll – am Ende stand eine funktionierende Trainingsumgebung, die Fortschritt messbar macht.</p>
			`,
			en: `
			<p class="lead">Big Speech VR is a virtual presentation coach built with Unity. Users import their own slides and present in front of an animated, interactive audience while the app measures how it goes.</p>
			${figure('bigspeechvr1.png', 'Presenting to a virtual audience')}
			<h2>Features</h2>
			<ul>
				<li><strong>Presentation import:</strong> load your own slides and keywords as a text file</li>
				<li><strong>Feature selection:</strong> enable an interactive audience, pulse tracking and voice tracking before starting</li>
				<li><strong>Presentation mode:</strong> speak in front of an animated NPC audience in a virtual studio</li>
				<li><strong>Feedback:</strong> heart rate, filler words, keyword usage and total duration</li>
				<li><strong>History:</strong> compare the current run with previous attempts</li>
			</ul>
			<h2>Tech</h2>
			<p>Custom 3D models for the studio, tutorial and hand menu, custom C# scripts for data processing, NPC reactions and presentation logic. Hyperate provides heart-rate data, wit.ai detects filler words. OpenXR, XR Core Utilities and TextMeshPro form the VR foundation.</p>
			<h2>Challenges</h2>
			<p>Combining several SDKs and keeping the interaction with the VR hardware smooth was demanding – the result is a working training environment that makes progress measurable.</p>
			`
		},
		screenshots: [
			{ src: img('bigspeechvr2.png'), label: { de: 'Auswertung', en: 'Evaluation' } },
			{ src: img('bigspeechvr3.png'), label: { de: 'Studio', en: 'Studio' } }
		]
	},
	{
		slug: 'fh-wave-app',
		color: '#3BA7D9',
		name: { de: 'FH-Wave', en: 'FH-Wave' },
		type: { de: 'Teamprojekt · Mobile & Web-App', en: 'Team project · Mobile & web app' },
		logo: Assets.FHWave,
		period: { from: new Date(2023, 3, 1), to: new Date(2023, 6, 31) },
		links: [
			{ to: 'https://l4223.github.io/FH-Wave-Demo/', label: { de: 'Live-Demo', en: 'Live demo' } },
			github('FH-Wave-Demo')
		],
		skillSlugs: ['flutter', 'dart', 'firebase', 'git', 'figma', 'scrum'],
		shortDescription: {
			de: 'Studierenden-App der FH Kiel, entstanden im zehnköpfigen Scrum-Team – heute mit Demo-Modus direkt im Browser.',
			en: 'Student app for Kiel University of Applied Sciences, built by a ten-person Scrum team – now with a demo mode right in the browser.'
		},
		description: {
			de: `
			<p class="lead">FH-Wave bündelt den Studienalltag an der FH Kiel in einer App: Lerngruppen mit gemeinsamem Kalender, Stundenplan-Auswertung, Campus-Navigation und Quicklinks, als frei anordnenbare Widgets auf dem Startbildschirm. Entstanden im Sommersemester 2023 im Modul „Agile Entwicklungsmethoden“ in einem Scrum-Team aus zehn Studierenden.</p>
			<p><a href="https://l4223.github.io/FH-Wave-Demo/" target="_blank" rel="noopener">→ Live-Demo öffnen</a> – startet direkt mit Beispieldaten, keine Anmeldung nötig.</p>
			${figure('fh-wave/overview.jpg', 'Startseite, Gruppe, Gruppenkalender und Stundenplan-Auswertung')}
			<h2>Mein Anteil im Team (2023)</h2>
			<ul>
				<li><strong>Projekt-Setup:</strong> Flutter-Projekt mit Plattformen, Abhängigkeiten und erstem Home-Screen, auf dem das Team aufgebaut hat</li>
				<li><strong>Gruppensystem:</strong> Gruppen anlegen und auflösen, Einladungen versenden und verwalten, Mitglieder hinzufügen und entfernen – mit Prüfungen, dass nur existierende Nutzer:innen eingeladen werden und niemand doppelt in einer Gruppe landet</li>
				<li><strong>Gruppenkalender:</strong> Kalenderansicht pro Gruppe und gemeinsame Termine</li>
				<li><strong>Kalender</strong> überarbeitet und Projekt-README geschrieben</li>
			</ul>
			<h2>Meine Weiterentwicklung (2026)</h2>
			<p>Die Original-App hing an einem Firebase-Projekt des Teams und war ohne Konto nicht ausprobierbar. Ich habe sie so erweitert, dass sie öffentlich im Browser läuft:</p>
			<ul>
				<li><strong>Demo-Modus mit austauschbarem Backend:</strong> Alle Firebase-Zugriffe laufen über eine zentrale <code>Backend</code>-Klasse. Im Demo-Modus ersetzen In-Memory-Implementierungen Firestore und Auth und werden mit fiktiven Beispieldaten befüllt.</li>
				<li><strong>Web-Plattform:</strong> Flutter-Web-Build, veröffentlicht über GitHub Pages</li>
				<li><strong>Reproduzierbarer Build:</strong> Abhängigkeiten auf Flutter 3.10 abgestimmt</li>
				<li><strong>Aufgeräumt:</strong> UI-Fix für lange Gruppennamen, Test-Login aus der Doku entfernt</li>
			</ul>
			<h2>Tech-Stack</h2>
			<p>Flutter 3.10, Dart 3, Provider · Firebase Authentication, Cloud Firestore · Syncfusion Calendar, table_calendar · Google Maps · Scrum mit vier Sprints, GitLab CI, Figma.</p>
			`,
			en: `
			<p class="lead">FH-Wave brings student life at Kiel University of Applied Sciences into one app: study groups with a shared calendar, timetable analysis, campus navigation and quick links, as rearrangeable widgets on the home screen. Built in summer semester 2023 in the “Agile Development Methods” module by a Scrum team of ten students.</p>
			<p><a href="https://l4223.github.io/FH-Wave-Demo/" target="_blank" rel="noopener">→ Open the live demo</a> – starts with sample data, no sign-up needed.</p>
			${figure('fh-wave/overview.jpg', 'Home, group, group calendar and timetable analysis')}
			<h2>My part in the team (2023)</h2>
			<ul>
				<li><strong>Project setup:</strong> the Flutter project with platforms, dependencies and first home screen the team built on</li>
				<li><strong>Group system:</strong> create and dissolve groups, send and manage invitations, add and remove members – with checks that only existing users are invited and nobody ends up in a group twice</li>
				<li><strong>Group calendar:</strong> calendar view per group and shared appointments</li>
				<li>Reworked the <strong>calendar</strong> and wrote the project README</li>
			</ul>
			<h2>My continuation (2026)</h2>
			<p>The original app depended on the team's Firebase project and could not be tried without an account. I extended it so it runs publicly in the browser:</p>
			<ul>
				<li><strong>Demo mode with a swappable back end:</strong> all Firebase access goes through a central <code>Backend</code> class. In demo mode, in-memory implementations replace Firestore and Auth and are seeded with fictional sample data.</li>
				<li><strong>Web platform:</strong> Flutter web build, published via GitHub Pages</li>
				<li><strong>Reproducible build:</strong> dependencies aligned with Flutter 3.10</li>
				<li><strong>Clean-up:</strong> UI fix for long group names, removed a test login from the docs</li>
			</ul>
			<h2>Tech stack</h2>
			<p>Flutter 3.10, Dart 3, Provider · Firebase Authentication, Cloud Firestore · Syncfusion Calendar, table_calendar · Google Maps · Scrum with four sprints, GitLab CI, Figma.</p>
			`
		},
		screenshots: [
			{ src: img('fh-wave/home.jpg'), label: { de: 'Startseite mit Widgets', en: 'Home with widgets' } },
			{ src: img('fh-wave/group-detail.jpg'), label: { de: 'Gruppe', en: 'Group' } },
			{ src: img('fh-wave/calendar.jpg'), label: { de: 'Gruppenkalender', en: 'Group calendar' } },
			{ src: img('fh-wave/timetable.jpg'), label: { de: 'Stundenplan-Auswertung', en: 'Timetable analysis' } }
		]
	},
	{
		slug: 'space-journey',
		color: '#8B5CF6',
		name: { de: 'Space Journey', en: 'Space Journey' },
		type: { de: 'Interaktive Installation · Teamprojekt', en: 'Interactive installation · Team project' },
		logo: Assets.SpaceJourney,
		period: { from: new Date(2023, 3, 1), to: new Date(2023, 5, 30) },
		links: [github('Space-Journey')],
		skillSlugs: ['blender', 'body-tracking'],
		shortDescription: {
			de: 'Mit dem eigenen Körper durchs Weltall: Kinect-Body-Tracking steuert per OSC Kamera in Blender und Musik in Ableton Live.',
			en: 'Fly through space with your body: Kinect body tracking drives the Blender camera and the music in Ableton Live via OSC.'
		},
		description: {
			de: `
			<p class="lead">Space Journey ist eine interaktive 3D-Installation aus dem Modul Creative Technologies (Sommersemester 2023), entstanden zu dritt. Besucher:innen steuern mit ihrem Körper eine Kamera durchs Weltall – die Musik reagiert dynamisch auf ihre Bewegungen.</p>
			<h2>So funktioniert es</h2>
			<ul>
				<li><strong>TouchDesigner</strong> liest die Body-Tracking-Daten der <strong>Kinect Azure</strong> (Hände, Oberkörper, Abstand) und normalisiert sie.</li>
				<li>Über <strong>OSC</strong> gehen die Werte an <strong>Blender</strong>: Der Oberkörper bewegt die Kamera, die Hände steuern ihre Rotation per Quaternion.</li>
				<li>Parallel steuert TouchDesigner über TDAbleton Parameter in <strong>Ableton Live</strong> – wer näher an die Kinect tritt, öffnet die Filter und macht die Effekte lauter.</li>
				<li>Alle Sounds sind selbst mit Ableton-Instrumenten gebaut, ohne Samples.</li>
			</ul>
			<h2>Herausforderungen</h2>
			<p>Die Kamera-Rotation per Quaternion aus reinen Positionsdaten zu steuern war schwer vorhersehbar, lieferte aber deutlich bessere Ergebnisse als Euler-Winkel. Und mit drei Programmen und zwei OSC-Plugins in der Kette war Fehlersuche oft Detektivarbeit.</p>
			`,
			en: `
			<p class="lead">Space Journey is an interactive 3D installation from the Creative Technologies module (summer semester 2023), built by a team of three. Visitors steer a camera through space with their body – and the music reacts dynamically to their movement.</p>
			<h2>How it works</h2>
			<ul>
				<li><strong>TouchDesigner</strong> reads body-tracking data from the <strong>Kinect Azure</strong> (hands, torso, distance) and normalises it.</li>
				<li>Via <strong>OSC</strong> the values go to <strong>Blender</strong>: the torso moves the camera, the hands control its rotation via quaternions.</li>
				<li>In parallel TouchDesigner drives parameters in <strong>Ableton Live</strong> through TDAbleton – stepping closer to the Kinect opens the filters and raises the effects.</li>
				<li>All sounds were built from Ableton instruments, without samples.</li>
			</ul>
			<h2>Challenges</h2>
			<p>Driving camera rotation with quaternions from position data alone was hard to predict, but worked far better than Euler angles. And with three programs and two OSC plugins in the chain, debugging was often detective work.</p>
			`
		}
	},
	{
		slug: 'js-pacman',
		color: '#FACC15',
		name: { de: 'JS Pac-Man', en: 'JS Pac-Man' },
		type: { de: 'Browserspiel · Studienprojekt', en: 'Browser game · University project' },
		logo: Assets.Pacman,
		period: { from: new Date(2022, 9, 1), to: new Date(2022, 9, 31) },
		links: [github('JS_Pacman')],
		skillSlugs: ['js', 'html', 'css'],
		shortDescription: {
			de: 'Eigene Pac-Man-Variante in reinem JavaScript aus dem Modul Webanwendungen – schaffst du Level 5?',
			en: 'My own Pac-Man variant in plain JavaScript from the Web Applications module – can you reach level 5?'
		},
		description: {
			de: `<p class="lead">Meine eigene Version des Retro-Klassikers, entwickelt im Modul Webanwendungen der FH Kiel – ohne Framework, nur mit JavaScript, HTML und CSS. Schaffst du es bis zu Level 5?</p>`,
			en: `<p class="lead">My own take on the retro classic, built in the Web Applications module at Kiel University of Applied Sciences – no framework, just JavaScript, HTML and CSS. Can you make it to level 5?</p>`
		}
	}
];

const mapProject = (item: LocalizedProject, lang: Language): Project => ({
	...item,
	name: translate(item.name, lang),
	description: translate(item.description, lang),
	shortDescription: translate(item.shortDescription, lang),
	type: translate(item.type, lang),
	links: item.links.map((link) => ({ ...link, label: translate(link.label, lang) })),
	screenshots: item.screenshots?.map((it) => ({ src: it.src, label: translate(it.label, lang) })),
	skills: getLocalizedSkills(lang, ...item.skillSlugs)
});

const ProjectsData = derived(language, ($language) => ({
	title: translate(title, $language),
	items: items.map((item) => mapProject(item, $language))
}));

export default ProjectsData;
