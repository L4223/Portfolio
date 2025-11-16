import SkillsData from '$lib/data/skills';
import { get } from 'svelte/store';

export function load({ params }: { params: Record<string, string> }) {
        if (params.slug) {
                const item = get(SkillsData).items.find((item) => {
                        return item.slug === params.slug;
                });

		return { item };
	}
}
