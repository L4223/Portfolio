import { translate, type LocalizedString } from '$lib/i18n';
import { language, type Language } from '$lib/stores/language';
import { derived } from 'svelte/store';
import Assets from './assets';
import type { Education } from './types';

type LocalizedEducation = Omit<Education, 'degree' | 'description' | 'location' | 'name' | 'organization' | 'shortDescription' | 'subjects'> & {
        degree: LocalizedString;
        description: LocalizedString;
        location: LocalizedString;
        name: LocalizedString;
        organization: LocalizedString;
        shortDescription: LocalizedString;
        subjects: Array<LocalizedString>;
};

const title: LocalizedString = { de: 'Bildung', en: 'Education' };

const items: Array<LocalizedEducation> = [
        {
                degree: { de: 'Bachelor of Engineering', en: 'Bachelor of Engineering' },
                description: { de: '', en: '' },
                location: { de: 'Kiel, Deutschland', en: 'Kiel, Germany' },
                logo: Assets.FH,
                name: { de: 'Medieningenieur', en: 'Media Engineering' },
                organization: { de: 'Fachhochschule Kiel', en: 'Kiel University of Applied Sciences' },
                period: { from: new Date(2021, 0, 1), to: new Date(2025, 5, 1) },
                shortDescription: { de: '', en: '' },
                slug: 'dummy-education-item-2',
                subjects: [
                        { de: 'Informatik', en: 'Computer Science' },
                        { de: 'Softwareentwicklung', en: 'Software Development' },
                        { de: 'Java Script', en: 'JavaScript' },
                        { de: 'Python', en: 'Python' },
                        { de: 'C#', en: 'C#' },
                        { de: 'UX/UI Design', en: 'UX/UI Design' }
                ]
        },
        {
                degree: { de: 'Abitur', en: 'Abitur (A-level equivalent)' },
                description: { de: '', en: '' },
                location: { de: 'Altenholz, Deutschland', en: 'Altenholz, Germany' },
                logo: Assets.GYMAHZ,
                name: { de: '', en: '' },
                organization: { de: 'Gymnasium Altenholz', en: 'Gymnasium Altenholz' },
                period: { from: new Date(2012, 0, 1), to: new Date(2020, 5, 1) },
                shortDescription: { de: '', en: '' },
                slug: 'dummy-education-item',
                subjects: [
                        { de: 'Biologie', en: 'Biology' },
                        { de: 'Chemie', en: 'Chemistry' },
                        { de: 'BYOD', en: 'BYOD' }
                ]
        }
];

const mapEducation = (item: LocalizedEducation, lang: Language): Education => ({
        ...item,
        degree: translate(item.degree, lang),
        description: translate(item.description, lang),
        location: translate(item.location, lang),
        name: translate(item.name, lang),
        organization: translate(item.organization, lang),
        shortDescription: translate(item.shortDescription, lang),
        subjects: item.subjects.map((subject) => translate(subject, lang))
});

const EducationData = derived(language, ($language) => ({
        title: translate(title, $language),
        items: items.map((item) => mapEducation(item, $language))
}));

export default EducationData;
