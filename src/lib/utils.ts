import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { base } from '$app/paths';
import { get } from 'svelte/store';
import { language, type Language } from '$lib/stores/language';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};


type Unit = 'year' | 'month';

const unitNames: Record<Language, Record<Unit, [string, string]>> = {
	de: { year: ['Jahr', 'Jahre'], month: ['Monat', 'Monate'] },
	en: { year: ['year', 'years'], month: ['month', 'months'] }
};

const formatUnit = (value: number, unit: Unit, lang: Language) =>
	`${value} ${unitNames[lang][unit][value === 1 ? 0 : 1]}`;

/**
 * Human readable duration in calendar months, counted inclusively like LinkedIn
 * (Dec 2024 - Jul 2025 = 8 months), e.g. "1 Jahr und 3 Monate" / "1 year and 3 months".
 */
export function computeExactDuration(from: Date, to: Date = new Date()): string {
	const lang = get(language);
	const and = lang === 'de' ? 'und' : 'and';

	const total = Math.max(
		1,
		(to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1
	);

	const years = Math.trunc(total / 12);
	const months = total % 12;

	const display: Array<string> = [];

	if (years > 0) display.push(formatUnit(years, 'year', lang));
	if (months > 0) display.push(formatUnit(months, 'month', lang));

	return display.join(` ${and} `);
}

export const getMonthName = (index: number): string => {
	const lang = get(language);

	return new Date(2000, index, 1).toLocaleString(lang === 'de' ? 'de-DE' : 'en-US', { month: 'long' });
};

export const href = (url: string) => `${base}${url}`;

export const getMonthAndYear = (date?: Date) => {
	if (!date) return get(language) === 'de' ? 'Heute' : 'Present';

	return `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
};
