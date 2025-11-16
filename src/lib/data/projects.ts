import { translate, type LocalizedString } from '$lib/i18n';
import { language, type Language } from '$lib/stores/language';
import { derived } from 'svelte/store';
import Assets from './assets';
import { getLocalizedSkills } from './skills';
import type { Project } from './types';

type LocalizedProject = Omit<Project, 'name' | 'description' | 'shortDescription' | 'type' | 'skills'> & {
        name: LocalizedString;
        description: LocalizedString;
        shortDescription: LocalizedString;
        type: LocalizedString;
        skillSlugs: Array<string>;
};

const title: LocalizedString = { de: 'Projekte', en: 'Projects' };

const items: Array<LocalizedProject> = [
        {
                slug: 'big-speech-vr',
                color: '#4A90E2',
                description: {
                        de: `
                        <div class="inner">
                                <h1>Big Speech VR</h1>

                                <span class="image right" style="margin-top: 60px"><img src="/screenshots/bigspeechvr1.png" alt=""></span>

                                <h3>Projektbeschreibung</h3>
                                <p>Big Speech VR ist ein innovatives Projekt, das darauf abzielt, die Fähigkeiten von Personen im Bereich der Präsentation durch einen virtuellen Präsentationstrainer namens BigSpeechVR zu verbessern. Das Projekt wurde in Unity entwickelt und bietet eine interaktive Umgebung, in der Nutzer ihre eigenen Präsentationen importieren und vor einem virtuellen Publikum präsentieren können. Durch die Integration verschiedener Funktionen wie interaktives Publikum, Pulstracking und Voicetracking bietet BigSpeechVR ein umfassendes Feedbacksystem, das es den Nutzern ermöglicht, ihre Präsentationsfähigkeiten zu verbessern.</p>

                                <h3>Funktionalitäten</h3>
                                <p>Präsentationsimport: Nutzer können ihre eigenen Präsentationen in das System importieren, einschließlich der Möglichkeit, Stichwörter als Textdatei zu importieren.</p>
                                <p>Auswahl von Features: Vor Beginn der Präsentation können Nutzer verschiedene Features auswählen, darunter ein interaktives Publikum, Pulstracking und Voicetracking.</p>
                                <p>Präsentationsmodus: Nach der Auswahl der gewünschten Features können Nutzer ihre Präsentation starten und vor einem animierten NPC-Publikum präsentieren.</p>
                                <p>Feedbacksystem: Nach Abschluss der Präsentation erhalten die Nutzer eine detaillierte Auswertung, einschließlich Pulswerten, der Anzahl der verwendeten Füllwörter, der Effektivität der Stichpunkte und der Gesamtdauer der Präsentation. Diese Auswertung ermöglicht es den Nutzern, ihren Fortschritt im Laufe der Zeit zu verfolgen und ihre Fähigkeiten zu verbessern.</p>
                                <p>Vergleich mit vorherigen Versuchen: Nutzer haben die Möglichkeit, ihre aktuellen Präsentationen mit ihren vorherigen Versuchen zu vergleichen, um ihren Fortschritt zu überwachen und Verbesserungen zu erkennen.</p>

                                <h3>Technische Details</h3>
                                <p>Das BigSpeechVR-Projekt verwendet verschiedene Technologien und Ressourcen, darunter:</p>
                                <p>3D-Modelle: Alle relevanten 3D-Modelle im Spiel, einschließlich des Studios, des Tutorials und des Handmenüs, wurden von den Entwicklern erstellt.</p>
                                <p>Skripte: Verschiedene benutzerdefinierte Skripte wurden entwickelt, um die Funktionalitäten des Spiels zu steuern, darunter Skripte zur Datenverarbeitung, zur Steuerung von NPC-Reaktionen und zur Handhabung der Präsentationslogik.</p>
                                <p>Integration von Drittanbieter-APIs: BigSpeechVR integriert externe APIs wie Hyperate für das Pulstracking und wit.ai für die Füllwörtererkennung.</p>
                                <p>Verwendung von Paketen und Assets: Das Projekt nutzt verschiedene Unity-Pakete und Assets, darunter OpenXR, XR Core Utilities und TextMeshPro, um eine immersive VR-Erfahrung zu bieten.</p>

                                <div class="row gtr-uniform" style="display: flex; gap: 1rem;">
                                        <div class="col-4" style="flex: 1;"><span class="image fit"><img src="/screenshots/bigspeechvr2.png" alt=""></span></div>
                                        <div class="col-4" style="flex: 1;"><span class="image fit"><img src="/screenshots/bigspeechvr3.png" alt=""></span></div>
                                </div>

                                <h3>Herausforderungen und Besonderheiten</h3>
                                <p>Das Projekt stellte die Entwickler vor Herausforderungen, insbesondere in Bezug auf die Integration von verschiedenen SDKs und die Gewährleistung einer reibungslosen Interaktion mit VR-Hardware. Trotz einiger technischer Herausforderungen konnten die Entwickler jedoch eine funktionale und ansprechende VR-Präsentationsumgebung schaffen, die es den Nutzern ermöglicht, ihre Fähigkeiten zu verbessern und sich weiterzuentwickeln.</p>
                        </div>
                `,
                        en: `
                        <div class="inner">
                                <h1>Big Speech VR</h1>

                                <span class="image right" style="margin-top: 60px"><img src="/screenshots/bigspeechvr1.png" alt=""></span>

                                <h3>Project Overview</h3>
                                <p>Big Speech VR is a virtual presentation coach built with Unity. Users import their slides and speak in front of an interactive virtual audience while the app tracks their performance.</p>

                                <h3>Key Features</h3>
                                <p>Presentation import: upload slides and even keyword text files to rehearse with real material.</p>
                                <p>Feature selection: pick an interactive audience, pulse tracking, or voice tracking before starting.</p>
                                <p>Presentation mode: present in front of an animated NPC audience in a virtual studio.</p>
                                <p>Feedback system: after each run the app returns heart rate data, filler word counts, keyword effectiveness, and total duration so progress is measurable over time.</p>
                                <p>History comparison: compare the current run with previous attempts to see improvement.</p>

                                <h3>Technical Details</h3>
                                <p>The project uses custom 3D assets for the studio, tutorial, and hand menu, bespoke scripts for data processing and NPC reactions, and integrations like Hyperate for pulse tracking and wit.ai for filler word detection.</p>
                                <p>Unity packages such as OpenXR, XR Core Utilities, and TextMeshPro provide the VR foundations.</p>

                                <div class="row gtr-uniform" style="display: flex; gap: 1rem;">
                                        <div class="col-4" style="flex: 1;"><span class="image fit"><img src="/screenshots/bigspeechvr2.png" alt=""></span></div>
                                        <div class="col-4" style="flex: 1;"><span class="image fit"><img src="/screenshots/bigspeechvr3.png" alt=""></span></div>
                                </div>

                                <h3>Challenges</h3>
                                <p>Integrating multiple SDKs and ensuring smooth VR hardware interaction was demanding, but resulted in a responsive training environment that helps users level up their presentation skills.</p>
                        </div>
                `
                },
                shortDescription: {
                        de: 'VR-gestützter Präsentationstrainer mit interaktivem Feedbacksystem.',
                        en: 'VR presentation trainer with interactive feedback.'
                },
                links: [
                        { to: 'https://github.com/L4223/BigSpeechVR', label: 'GitHub Repository' }
                ],
                logo: Assets.BigSpeechVR,
                name: { de: 'Big Speech VR', en: 'Big Speech VR' },
                period: {
                        from: new Date(2024, 0, 1),
                        to: new Date(2024, 3, 15)
                },
                skillSlugs: ['unity', 'c#', 'vr', 'ai', 'pulse-tracking', 'voice-tracking'],
                type: { de: 'VR-Anwendung', en: 'VR Application' }
        },
        {
                slug: 'bachelor-thesis-webxr',
                color: '#6A1B9A',
                description: {
                        de: 'Eine interaktive WebXR-Anwendung zur Verbesserung des Lernens im Schulunterricht. Entwicklung einer prototypischen Lösung zur Integration in bestehende LMS.',
                        en: 'An interactive WebXR application that enhances classroom learning, delivered as a prototype ready for LMS integration.'
                },
                shortDescription: {
                        de: 'Interaktive WebXR-Anwendung für den schulischen Unterricht mit LMS-Integration.',
                        en: 'Interactive WebXR classroom experience with LMS integration.'
                },
                links: [
                        { to: 'https://github.com/', label: 'GitHub Repository' }
                ],
                logo: Assets.SchoolXR,
                name: { de: 'Bachelor Thesis WebXR', en: 'Bachelor Thesis WebXR' },
                period: {
                        from: new Date(2025, 3, 1),
                        to: new Date(2025, 5, 31)
                },
                skillSlugs: ['webxr', 'js', 'nextjs'],
                type: { de: 'Forschungsprojekt', en: 'Research Project' }
        },
        {
                slug: 'fh-wave-app',
                color: '#ADD8E6',
                description: {
                        de: `
                        <p class="mb-3">Unser Projekt, die FH-Wave App, war eine Full-Stack-Anwendung im Rahmen des Moduls "Agile Entwicklungsmethoden". Unser sechsköpfiges Team arbeitete unter der Leitung eines Scrum Masters und eines Product Owners mit der Agilen Softwareentwicklungsmethode Scrum.</p>

                        <h1 class="mt-4 mb-2">Agile Entwicklung mit Scrum</h1>
                        <p class="mb-3">Scrum ermöglichte es uns, flexibel auf Änderungen zu reagieren und die Prioritäten entsprechend anzupassen, was besonders wichtig war, um die Anforderungen und Bedürfnisse der Studierenden der FH Kiel in der FH-Wave App optimal zu erfüllen. Durch regelmäßige Meetings wie Daily Stand-ups, Sprint Reviews und Retrospektiven stellten wir sicher, dass das Team gut informiert und die Arbeit transparent war.</p>

                        <h2 class="mt-4 mb-2">Technologie und Entwicklungsmethoden</h2>
                        <p class="mb-3">Wir konzentrierten uns auf die Programmierung der App mit Flutter, inklusive der Integration von Firebase Auth für eine sichere Anmeldung und einer Datenbank für die Speicherung relevanter Informationen. Dabei nutzten wir Git für eine effiziente Versionskontrolle und Zusammenarbeit im Team. Der Entwicklungsprozess begann mit der Erstellung eines detaillierten Figma-Prototyps, um eine klare Vorstellung von der App zu erhalten, bevor wir mit der eigentlichen App-Entwicklung begannen.</p>

                        <h3 class="mt-4 mb-2">Ziel und Funktionen der FH-Wave App</h3>
                        <p class="mb-3">Die FH-Wave App zielte darauf ab, den Studienalltag der Studierenden an der FH Kiel zu erleichtern. Zu den geplanten Funktionen gehörten unter anderem eine Gruppenfunktion für die Zusammenarbeit in Projekten, ein Kalender mit der Möglichkeit eines Gruppenkalenders, die Auswertung des Stundenplans nach Anfangszeiten für eine bessere Planung, eine Campus-Navigation zur einfachen Routenführung zu bestimmten Gebäuden und ein Darkmode für eine angenehme Benutzererfahrung auch bei wenig Licht.</p>

                        <p class="mb-3">Mit unserem Projekt FH-Wave App wollten wir einen wirklichen Mehrwert für die Studierenden schaffen und gleichzeitig moderne Technologien und agile Entwicklungsmethoden optimal einsetzen.</p>

                        <iframe class="mt-4" style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&amp;url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2BIHFaTz4u4FBwlu6wyJzK%2FAEM%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DwXGSoGC3UBtcdox7-1" allowfullscreen=""></iframe>
                `,
                        en: `
                        <p class="mb-3">FH-Wave was a full-stack app we built for the “Agile Development Methods” module. Our six-person team worked with a Scrum Master and Product Owner to ship the project using Scrum.</p>

                        <h1 class="mt-4 mb-2">Agile Collaboration</h1>
                        <p class="mb-3">Scrum let us react to change and reprioritize quickly—essential for meeting student needs at FH Kiel. Daily stand-ups, sprint reviews, and retrospectives kept everyone aligned and transparent.</p>

                        <h2 class="mt-4 mb-2">Technology Choices</h2>
                        <p class="mb-3">We built the app with Flutter, integrated Firebase Auth for secure sign-in, and used a database to store student data. Git kept collaboration smooth, and a detailed Figma prototype guided development before we wrote code.</p>

                        <h3 class="mt-4 mb-2">Goals & Features</h3>
                        <p class="mb-3">FH-Wave aimed to simplify student life with project groups, calendars (including group calendars), timetable analytics for better planning, campus navigation, and dark mode for comfortable use at night.</p>

                        <p class="mb-3">The project combined meaningful student value with modern technology and agile practice.</p>

                        <iframe class="mt-4" style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&amp;url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2BIHFaTz4u4FBwlu6wyJzK%2FAEM%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DwXGSoGC3UBtcdox7-1" allowfullscreen=""></iframe>
                `
                },
                shortDescription: {
                        de: 'Full-Stack-Anwendung zur Unterstützung des Studienalltags an der FH Kiel, entwickelt mit Scrum und modernen Technologien.',
                        en: 'Full-stack app to support student life at FH Kiel, built with Scrum and modern tooling.'
                },
                links: [
                        { to: 'https://github.com/L4223/FH-Wave', label: 'GitHub Repository' }
                ],
                logo: Assets.FHWave,
                name: { de: 'FH-Wave App', en: 'FH-Wave App' },
                period: {
                        from: new Date(2023, 9, 1),
                        to: new Date(2024, 1, 1)
                },
                skillSlugs: ['flutter', 'firebase', 'git', 'figma', 'scrum', 'full-stack'],
                type: { de: 'Full-Stack-Anwendung', en: 'Full-stack Application' }
        }
];

const mapProject = (item: LocalizedProject, lang: Language): Project => ({
        ...item,
        name: translate(item.name, lang),
        description: translate(item.description, lang),
        shortDescription: translate(item.shortDescription, lang),
        type: translate(item.type, lang),
        skills: getLocalizedSkills(lang, ...item.skillSlugs)
});

const ProjectsData = derived(language, ($language) => ({
        title: translate(title, $language),
        items: items.map((item) => mapProject(item, $language))
}));

export default ProjectsData;
