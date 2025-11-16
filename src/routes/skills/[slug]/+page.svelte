<script lang="ts">
	import BasePage from '$lib/components/common/base-page/base-page.svelte';
	import EmptyResult from '$lib/components/common/empty-result/empty-result.svelte';
        import FancyBanner from '$lib/components/common/fancy-banner/fancy-banner.svelte';
        import EmptyMarkdown from '$lib/components/common/markdown/empty-markdown.svelte';
        import Markdown from '$lib/components/common/markdown/markdown.svelte';
        import { Badge } from '$lib/components/ui/badge';
        import Separator from '$lib/components/ui/separator/separator.svelte';
        import H1 from '$lib/components/ui/typography/h1.svelte';
        import Muted from '$lib/components/ui/typography/muted.svelte';
        import Assets from '$lib/data/assets';
        import SkillsData from '$lib/data/skills';
        import UiText from '$lib/data/ui';
        import { translate, type LocalizedString } from '$lib/i18n';
        import { language } from '$lib/stores/language';
        import ExperienceData from '$lib/data/experience';
        import ProjectsData from '$lib/data/projects';
        import type { Skill } from '$lib/data/types';
        import { href } from '$lib/utils';
        import { mode } from 'mode-watcher';

	let { data }: { data: { item?: Skill } } = $props();

        const notFound: LocalizedString = { de: 'Nicht gefunden', en: 'Not found' };
        let title = $derived(`${data?.item?.name ?? translate(notFound, $language)} - ${$SkillsData.title}`);
	let banner = $derived(
		($mode == 'dark' ? data?.item?.logo.dark : data.item?.logo.light) ?? Assets.Unknown.light
	);

	let related = $derived(
		(() => {
			const current = data.item;

			if (!current) return [];

			const items: Array<{ name: string; logo: string; link: string }> = [];

                        $ProjectsData.items.forEach((it) => {
                                if (it.skills.find((skill) => skill.slug === current.slug)) {
                                        items.push({
                                                link: `/projects/${it.slug}`,
						logo: $mode === 'dark' ? it.logo.dark : it.logo.light,
						name: it.name
					});
				}
			});

                        $ExperienceData.items.forEach((it) => {
                                if (it.skills.find((skill) => skill.slug === current.slug)) {
                                        items.push({
                                                link: `/experience/${it.slug}`,
						logo: $mode === 'dark' ? it.logo.dark : it.logo.light,
						name: it.name
					});
				}
			});

			return items;
		})()
	);
</script>

<BasePage {title}>
	{#if !data.item}
		<EmptyResult />
	{:else}
		<FancyBanner img={banner}>
			<H1>{data.item.name}</H1>
		</FancyBanner>
		<Separator />
		{#if data.item.description.trim()}
			<Markdown content={data.item.description} />
		{:else}
			<EmptyMarkdown />
		{/if}
		<Separator />
		{#if related.length !== 0}
			<div class="flex flex-row flex-wrap items-center gap-2 py-4">
                                <Muted>{$UiText.relatedItems}</Muted>
				{#each related as item}
					<a href={href(item.link)}>
						<Badge>{item.name}</Badge>
					</a>
				{/each}
			</div>
		{/if}
	{/if}
</BasePage>
