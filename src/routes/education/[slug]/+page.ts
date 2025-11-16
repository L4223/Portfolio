import EducationData from '$lib/data/education';
import { get } from 'svelte/store';

export function load({ params }: { params: Record<string, string> }) {
        if (params.slug) {
                const item = get(EducationData).items.find((item) => {
                        return item.slug === params.slug;
                });

		return { item };
	}
}
