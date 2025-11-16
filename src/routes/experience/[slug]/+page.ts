import ExperienceData from '$lib/data/experience';
import { get } from 'svelte/store';

export function load({ params }: { params: Record<string, string> }) {
        if (params.slug) {
                const item = get(ExperienceData).items.find((item) => {
                        return item.slug === params.slug;
                });

		return { item };
	}
}
