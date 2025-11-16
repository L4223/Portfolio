import ProjectsData from '$lib/data/projects';
import { get } from 'svelte/store';

export function load({ params }: { params: Record<string, string> }) {
        if (params.slug) {
                const item = get(ProjectsData).items.find((item) => {
                        return item.slug === params.slug;
                });

		return { item };
	}
}
