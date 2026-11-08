<script lang="ts">
	import BasePage from '$lib/components/common/base-page/base-page.svelte';
	import EmptyResult from '$lib/components/common/empty-result/empty-result.svelte';
	import FancyBanner from '$lib/components/common/fancy-banner/fancy-banner.svelte';
	import EmptyMarkdown from '$lib/components/common/markdown/empty-markdown.svelte';
	import Markdown from '$lib/components/common/markdown/markdown.svelte';
	import ScreenshotCard from '$lib/components/common/screenshot/screenshot-card.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import H1 from '$lib/components/ui/typography/h1.svelte';
	import Muted from '$lib/components/ui/typography/muted.svelte';
	import Assets from '$lib/data/assets';
	import EducationData from '$lib/data/education';
	import type { Education } from '$lib/data/types';
	import { computeExactDuration, getMonthAndYear } from '$lib/utils';
	import { mode } from 'mode-watcher';

	let { data }: { data: { item?: Education } } = $props();

	// re-resolve from the store so the page follows the language toggle
	let item = $derived($EducationData.items.find((it) => it.slug === data.item?.slug));

	let title = $derived(`${item?.organization ?? 'Not Found'} - ${$EducationData.title}`);
	let banner = $derived(
		($mode == 'dark' ? item?.logo.dark : item?.logo.light) ?? Assets.Unknown.light
	);

	let duration = $derived(
		`${getMonthAndYear(item?.period.from)} - ${getMonthAndYear(item?.period.to)} · ${computeExactDuration(
			item?.period.from ?? new Date(),
			item?.period.to
		)}`
	);
</script>

<BasePage {title}>
	{#if !item}
		<EmptyResult />
	{:else}
		<FancyBanner img={banner}>
			<div class="flex w-full flex-col items-center justify-center gap-4">
				<H1>{item.degree}</H1>
				<Muted>{item.organization} · {item.location}</Muted>
				<Muted><Muted>{duration}</Muted></Muted>
				<Separator />
				<div class="flex flex-row flex-wrap justify-center gap-2">
					{#each item.subjects as subject (subject)}
						<Badge variant="outline" class="flex flex-row items-center justify-center gap-2">
							<Muted>{subject}</Muted>
						</Badge>
					{/each}
				</div>
			</div>
		</FancyBanner>
		<Separator />
		{#if item.description.trim()}
			<Markdown content={item.description} />
		{:else}
			<EmptyMarkdown />
		{/if}
		<Separator />
		<div class="flex flex-col gap-2 px-4 pt-4">
			{#if item.screenshots && item.screenshots.length > 0}
				<Muted>Screenshots</Muted>
				<div class="grid grid-cols-1 gap-2 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{#each item.screenshots as img, index (index)}
						<ScreenshotCard item={img} />
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</BasePage>
