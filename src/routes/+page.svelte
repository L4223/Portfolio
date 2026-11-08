<script lang="ts">
	import Title from '$lib/components/common/title/title.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
        import Icon from '$lib/components/ui/icon/icon.svelte';
        import ResponsiveContainer from '$lib/components/ui/responsive-container/responsive-container.svelte';
        import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
        import H1 from '$lib/components/ui/typography/h1.svelte';
        import Muted from '$lib/components/ui/typography/muted.svelte';
        import HomeData from '$lib/data/home';
        import { translate, type LocalizedString } from '$lib/i18n';
        import { language } from '$lib/stores/language';
        import { href } from '$lib/utils';
        import { mode } from 'mode-watcher';
        import RotatingModel, { type AvatarVariant } from '$lib/components/3d/RotatingModel.svelte';
        import { page } from '$app/stores';
        import { Canvas } from '@threlte/core';

        const greeting: LocalizedString = { de: 'Moin, ich bin Lasse!', en: "Hi, I'm Lasse!" };
        const role: LocalizedString = {
                de: 'Frontend- & Fullstack-Entwickler · WebXR · KI-Integration',
                en: 'Frontend & full-stack developer · WebXR · AI integration'
        };
        const ctaProjects: LocalizedString = { de: 'Projekte ansehen', en: 'View projects' };
        const ctaResume: LocalizedString = { de: 'Lebenslauf', en: 'Resume' };

        // ?avatar=xr|dev|original to compare the avatar versions
        const variants: Array<AvatarVariant> = ['xr', 'dev', 'original'];
        let avatar = $derived.by(() => {
                const requested = $page.url.searchParams.get('avatar') as AvatarVariant | null;
                return requested && variants.includes(requested) ? requested : 'xr';
        });
</script>

<Title title={$HomeData.title} />
<ResponsiveContainer className="flex flex-col justify-center flex-1">
        <div
                class="flex flex-1 flex-col items-center justify-center px-14 md:flex-row md:justify-between"
	>
                <div
                        class="content-container flex flex-col items-center justify-center gap-4 text-center md:items-start md:text-left"
                >
                        <H1>{translate(greeting, $language)}</H1>
                        <p class="text-lg font-medium">{translate(role, $language)}</p>
                        <Muted className="max-w-[560px]">{$HomeData.hero.description}</Muted>
                        <div class="flex flex-row flex-wrap justify-center gap-2 md:justify-start">
                                <a href={href('/projects')}><Button>{translate(ctaProjects, $language)}</Button></a>
                                <a href={href('/resume')}><Button variant="outline">{translate(ctaResume, $language)}</Button></a>
                        </div>
                        <div class="flex flex-row gap-1">
                                {#each $HomeData.hero.links as item}
                                        <a href={item.href} target="_blank" rel="noopener" aria-label={item.label}>
                                                <Tooltip>
                                                        <TooltipTrigger>
								<Button variant="outline" size="icon">
									<Icon icon={item.icon} className="text-lg" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">{item.label}</TooltipContent>
						</Tooltip>
					</a>
				{/each}
			</div>
		</div>
		<div>
			<!-- <Carousel bind:api class="w-[200px] md:ml-14" opts={{ loop: true }}>
				<CarouselContent>
					{#each HomeData.carousel as item}
						<CarouselItem class="flex flex-col items-center justify-center gap-4">
							<img
								src={$mode === 'dark' ? item.logo.dark : item.logo.light}
								class="h-[150px] w-[150px]"
								alt={item.name}
							/>
							<a href={href(`/skills/${item.slug}`)}>
								<Button variant="ghost">{item.name}</Button>
							</a>
						</CarouselItem>
					{/each}
				</CarouselContent>
				<CarouselNext />
				<CarouselPrevious />
			</Carousel> -->

			<div class="canvas-container">
                                {#key avatar}
                                        <Canvas>
                                                <RotatingModel variant={avatar} />
                                        </Canvas>
                                {/key}
			</div>
		</div>
	</div>
</ResponsiveContainer>

<style>
	/* Styles for Canvas background */
	.canvas-container {
		/* position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1; 
		display: flex;
		justify-content: center;
		align-items: center; */
		width: 300px;
		height: min(700px, 60vh);
	}

	/* Ensures content remains in front of the canvas */
	.content-container {
		position: relative;
		z-index: 1;
		padding: 20px;
		text-align: center;
	}
</style>
