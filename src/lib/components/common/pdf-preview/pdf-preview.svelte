<script lang="ts">
	import { onMount } from 'svelte';
	import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
	import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url';

	export let src: string;
	export let title = 'PDF Preview';

	let canvas: HTMLCanvasElement;
	let loading = true;
	let error = false;

	pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

	async function renderPdf() {
		if (!canvas || !src) {
			return;
		}

		loading = true;
		error = false;

		try {
			const pdf = await pdfjsLib.getDocument({ url: src }).promise;
			const page = await pdf.getPage(1);
			const viewport = page.getViewport({ scale: 1.1 });
			const context = canvas.getContext('2d');

			if (!context) {
				throw new Error('Canvas context is unavailable');
			}

			canvas.width = viewport.width;
			canvas.height = viewport.height;
			await page.render({ canvas, viewport }).promise;
		} catch (caughtError) {
			console.error(caughtError);
			error = true;
		} finally {
			loading = false;
		}
	}

	$: if (src && canvas) {
		renderPdf();
	}

	onMount(() => {
		if (src) {
			renderPdf();
		}
});
</script>

<div class="w-full rounded-lg border border-border bg-white p-3 shadow-sm" aria-label={title}>
	{#if loading}
		<div class="flex min-h-[560px] items-center justify-center text-sm text-muted-foreground">PDF wird geladen…</div>
	{:else if error}
		<div class="flex min-h-[560px] flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
			<p>Die Vorschau konnte nicht gerendert werden.</p>
			<a href={src} download class="underline">PDF herunterladen</a>
		</div>
	{:else}
		<canvas bind:this={canvas} class="mx-auto max-w-full rounded-md bg-white"></canvas>
	{/if}
</div>
