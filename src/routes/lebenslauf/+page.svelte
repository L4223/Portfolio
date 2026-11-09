<script>
	import PdfPreview from '$lib/components/common/pdf-preview/pdf-preview.svelte';
	import TitledPage from '$lib/components/common/titled-page/titled-page.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ResumeData from '$lib/data/resume';
	import UiText from '$lib/data/ui';
</script>

<TitledPage title={$ResumeData.title}>
	<div class="flex w-full flex-wrap justify-center gap-2">
		<Button href={$ResumeData.resume} download="Lebenslauf_Lasse_Knodt.pdf">{$UiText.download}</Button>
		<Button href={$ResumeData.resume} target="_blank" rel="noopener" variant="outline">{$UiText.openNewTab}</Button>
	</div>

	<div class="mx-auto w-full max-w-5xl">
		<PdfPreview src={$ResumeData.resume} title={$ResumeData.title} />
	</div>
</TitledPage>
