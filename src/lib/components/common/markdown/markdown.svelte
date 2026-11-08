<script lang="ts">
	import { gfmHeadingId } from 'marked-gfm-heading-id';
	import { mangle } from 'marked-mangle';
	import Prism from 'prismjs';
	import createSanitizer from 'dompurify';
	import { marked } from 'marked';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/themes/prism-tomorrow.css';
	import { onMount } from 'svelte';

	let container: HTMLDivElement;

	export let content: string;

	let mounted = false;
	let renderId = 0;

	const render = async (value: string) => {
		const id = ++renderId;
		const parsed = await marked.parse(value);

		// ignore stale renders when the content changes quickly (e.g. language toggle)
		if (id !== renderId || !container) return;

		container.innerHTML = createSanitizer(window).sanitize(parsed);
		Prism.highlightAllUnder(container);
	};

	onMount(() => {
		marked.use(gfmHeadingId());
		marked.use(mangle());
		mounted = true;
	});

	$: if (mounted) render(content);
</script>

<div bind:this={container} class="markdown-container project-content"></div>
