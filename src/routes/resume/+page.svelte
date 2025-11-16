<script>
        import TitledPage from '$lib/components/common/titled-page/titled-page.svelte';
        import Button from '$lib/components/ui/button/button.svelte';
        import ResumeData from '$lib/data/resume';
        import UiText from '$lib/data/ui';
</script>

<TitledPage title={$ResumeData.title}>
        <a href={$ResumeData.resume} class="mx-auto">
                <Button>{$UiText.download}</Button>
        </a>
        <iframe src={$ResumeData.resume} class="h-full w-full" title={$ResumeData.title}></iframe>
</TitledPage>
