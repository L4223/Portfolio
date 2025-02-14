<script lang="ts">
	export let className = '';
</script>

<p {...$$restProps} class={`text-left text-sm text-muted-foreground ${className}`}>
	<slot />
</p>
