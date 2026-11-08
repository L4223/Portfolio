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
        import { Canvas } from '@threlte/core';
        import { WebGLRenderer } from 'three';

        // opaque canvas: the backdrop is drawn in WebGL in the page colour, so
        // the browser never has to blend a semi-transparent canvas
        const createRenderer = (canvas: HTMLCanvasElement) =>
                new WebGLRenderer({ canvas, alpha: false, antialias: true });
        import BlurredAvatar from '$lib/components/3d/BlurredAvatar.svelte';

        const greeting: LocalizedString = { de: 'Moin, ich bin Lasse!', en: "Hi, I'm Lasse!" };
        const role: LocalizedString = {
                de: 'Frontend- & Fullstack-Entwickler · WebXR · KI-Integration',
                en: 'Frontend & full-stack developer · WebXR · AI integration'
        };
        const ctaProjects: LocalizedString = { de: 'Projekte ansehen', en: 'View projects' };
        const ctaResume: LocalizedString = { de: 'Lebenslauf', en: 'Resume' };

        const avatarLabel: LocalizedString = {
                de: '3D-Figur von Lasse, weichgezeichnet. Zum Drehen ziehen.',
                en: '3D figure of Lasse, blurred. Drag to turn.'
        };
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

			<div class="avatar" role="img" aria-label={translate(avatarLabel, $language)}>
				<Canvas {createRenderer}>
					<BlurredAvatar />
				</Canvas>
			</div>
		</div>
	</div>
</ResponsiveContainer>

<style>
	/* Real-time 3D figure, blurred in WebGL like an out-of-focus photo (see
	   BlurredAvatar.svelte). The camera leaves a wide margin around the figure
	   so the blur fades out completely instead of being cut at the edges. */
	.avatar {
		width: min(380px, 92vw);
		height: min(800px, 74vh);
		cursor: grab;
		touch-action: pan-y;
		animation: avatar-in 1.2s ease-out both;
	}

	@media (min-width: 1280px) {
		.avatar {
			width: 460px;
		}
	}

	.avatar:active {
		cursor: grabbing;
	}

	@keyframes avatar-in {
		from {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.avatar {
			animation: none;
		}
	}

	/* Ensures content remains in front of the canvas */
	.content-container {
		position: relative;
		z-index: 1;
		padding: 20px;
		text-align: center;
	}
</style>
