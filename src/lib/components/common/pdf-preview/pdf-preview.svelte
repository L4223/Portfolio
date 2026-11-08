<script lang="ts">
	import { onMount } from 'svelte';
	import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
	import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url';
	import { language } from '$lib/stores/language';

	let { src, title = 'PDF' }: { src: string; title?: string } = $props();

	pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

	// The page container must always be in the DOM: rendering needs it, so it
	// can't live inside the "loaded" branch (that was the old "stuck on loading" bug).
	let container: HTMLDivElement;
	let status: 'loading' | 'ready' | 'error' = $state('loading');
	let renderId = 0;

	const copy = {
		de: { loading: 'PDF wird geladen…', error: 'Die Vorschau konnte nicht geladen werden.', open: 'PDF öffnen' },
		en: { loading: 'Loading PDF…', error: 'The preview could not be loaded.', open: 'Open PDF' }
	};
	let text = $derived(copy[$language]);

	async function render() {
		if (!container || !src) return;

		const id = ++renderId;

		try {
			const pdf = await pdfjsLib.getDocument({ url: src }).promise;
			const width = container.clientWidth || 800;
			const ratio = window.devicePixelRatio || 1;
			const canvases: Array<HTMLCanvasElement> = [];

			for (let n = 1; n <= pdf.numPages; n++) {
				const page = await pdf.getPage(n);
				const base = page.getViewport({ scale: 1 });
				const viewport = page.getViewport({ scale: (width / base.width) * ratio });

				const canvas = document.createElement('canvas');
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				canvas.style.width = '100%';
				canvas.className = 'rounded-md bg-white shadow-sm';
				canvas.setAttribute('aria-label', `${title} – ${n}/${pdf.numPages}`);

				await page.render({ canvas, viewport }).promise;
				canvases.push(canvas);
			}

			if (id !== renderId) return;

			container.replaceChildren(...canvases);
			status = 'ready';
		} catch (caughtError) {
			console.error(caughtError);
			if (id === renderId) status = 'error';
		}
	}

	onMount(() => {
		render();

		// re-render sharply when the available width changes noticeably
		let lastWidth = container.clientWidth;
		let timer: ReturnType<typeof setTimeout>;
		const observer = new ResizeObserver(() => {
			const width = container.clientWidth;
			if (Math.abs(width - lastWidth) < 40) return;
			lastWidth = width;
			clearTimeout(timer);
			timer = setTimeout(render, 200);
		});
		observer.observe(container);

		return () => {
			observer.disconnect();
			clearTimeout(timer);
		};
	});
</script>

<div class="w-full rounded-lg border border-border bg-muted/30 p-2 sm:p-3" role="document" aria-label={title}>
	{#if status === 'loading'}
		<div class="flex min-h-[400px] items-center justify-center text-sm text-muted-foreground">
			{text.loading}
		</div>
	{:else if status === 'error'}
		<div class="flex min-h-[400px] flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
			<p>{text.error}</p>
			<a href={src} target="_blank" rel="noopener" class="underline">{text.open}</a>
		</div>
	{/if}
	<div bind:this={container} class="flex flex-col gap-3"></div>
</div>
