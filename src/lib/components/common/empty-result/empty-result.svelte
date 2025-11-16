<script>
        import Icon from '$lib/components/ui/icon/icon.svelte';
        import Large from '$lib/components/ui/typography/large.svelte';
        import Muted from '$lib/components/ui/typography/muted.svelte';
        import UiText from '$lib/data/ui';
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-2">
        <Icon className="text-3xl" icon="i-carbon-ai-status-failed" />
        <Large>{$UiText.emptyTitle}</Large>
        <Muted>{$UiText.emptyMessage}</Muted>
</div>
