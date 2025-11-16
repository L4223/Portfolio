<script lang="ts">
        import { derived } from 'svelte/store';
        import Button from '$lib/components/ui/button/button.svelte';
        import {
                Dialog,
		DialogClose,
		DialogContent,
		DialogFooter,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Tooltip, TooltipTrigger } from '$lib/components/ui/tooltip';
        import TooltipContent from '$lib/components/ui/tooltip/tooltip-content.svelte';
        import H4 from '$lib/components/ui/typography/h4.svelte';
        import Large from '$lib/components/ui/typography/large.svelte';
        import NavBarData from '$lib/data/nav-bar';
        import UiText from '$lib/data/ui';
        import { language, setLanguage } from '$lib/stores/language';
        import { href } from '$lib/utils';
        import { mode, toggleMode } from 'mode-watcher';

        let isDarkMode = derived(mode, ($mode) => $mode === 'dark');
</script>

<div
	class="border-1 absolute left-0 right-0 top-0 z-10 flex h-[50px] flex-row items-center border-b bg-[--bg] px-4 backdrop-blur-xl sm:px-8"
	style="--bg : hsl(var(--background) / 0.5)"
>
	<div class="sm:flex-1">
                <a href={href('/')} class="flex flex-row items-center justify-start gap-2 text-2xl">
                        <Tooltip>
                                <TooltipTrigger>
                                        <Icon icon={$NavBarData.left.icon} />
                                </TooltipTrigger>
                                <TooltipContent side="bottom" class="lg:hidden">
                                        {$NavBarData.left.title}
                                </TooltipContent>
                        </Tooltip>
                        <H4 className="hidden lg:block">{$NavBarData.left.title}</H4>
                </a>
        </div>

	<!-- larger than sm -->
	<div class="hidden flex-[2] flex-row items-center justify-center gap-2 sm:flex">
                {#each $NavBarData.items as item}
                        <a href={href(item.href)}>
                                <Tooltip>
                                        <TooltipTrigger>
						<Button class="flex flex-row items-center justify-center gap-2" variant="ghost">
							<Icon icon={item.icon} className="text-xl" />
							<div class="hidden lg:block">{item.title}</div>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom" class="lg:hidden">
						{item.title}
					</TooltipContent>
				</Tooltip>
			</a>
		{/each}
        </div>
        <div class="hidden flex-row items-center justify-end gap-2 sm:flex sm:flex-1">
                <a href={href('/search')}>
                        <Button variant="ghost" class="text-xl">
                                <Icon icon="i-carbon-search" />
                        </Button>
                </a>
                <div class="flex items-center gap-1">
                        <Button
                                variant={$language === 'de' ? 'secondary' : 'ghost'}
                                size="sm"
                                on:click={() => setLanguage('de')}
                        >
                                DE
                        </Button>
                        <Button
                                variant={$language === 'en' ? 'secondary' : 'ghost'}
                                size="sm"
                                on:click={() => setLanguage('en')}
                        >
                                EN
                        </Button>
                </div>
                <Button variant="ghost" class="text-xl" on:click={toggleMode}>
                        <Icon icon={$isDarkMode ? 'i-carbon-moon' : 'i-carbon-sun'} />
                </Button>
	</div>

	<!-- sm -->
        <div class="flex flex-[2] flex-row items-center justify-center sm:hidden">
                <a href={href('/')}>
                        <Large>{$NavBarData.left.title}</Large>
                </a>
        </div>
	<div class="flex flex-row items-center justify-center sm:hidden">
		<Dialog>
			<DialogTrigger>
				<Button size="icon" variant="ghost">
					<Icon className="text-xl" icon="i-carbon-menu" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div class="flex flex-col gap-2 pt-4">
                                        {#each $NavBarData.items as item}
                                                <DialogClose>
                                                        <a href={href(item.href)} class="w-full">
								<Button
									class="flex w-full flex-row items-center justify-start gap-2"
									variant="ghost"
								>
									<Icon icon={item.icon} className="text-xl" />
									<div>{item.title}</div>
								</Button>
							</a>
						</DialogClose>
					{/each}
					<Separator />
                                        <DialogClose>
                                                <a href={href('/search')} class="w-full">
                                                        <Button class="flex w-full flex-row items-center justify-start gap-2" variant="ghost">
                                                                <Icon icon={'i-carbon-search'} className="text-xl" />
                                                                <div>{$UiText.search}</div>
                                                        </Button>
                                                </a>
                                        </DialogClose>
                                        <Separator />
                                        <div class="flex flex-row items-center justify-between gap-2">
                                                <div class="flex flex-row items-center gap-2">
                                                        <Icon icon="i-carbon-translate" className="text-xl" />
                                                        <Large>{$UiText.language}</Large>
                                                </div>
                                                <div class="flex flex-row gap-1">
                                                        <Button
                                                                variant={$language === 'de' ? 'secondary' : 'ghost'}
                                                                size="sm"
                                                                on:click={() => setLanguage('de')}
                                                        >
                                                                DE
                                                        </Button>
                                                        <Button
                                                                variant={$language === 'en' ? 'secondary' : 'ghost'}
                                                                size="sm"
                                                                on:click={() => setLanguage('en')}
                                                        >
                                                                EN
                                                        </Button>
                                                </div>
                                        </div>
                                        <Separator />
                                        <Button
                                                class="flex w-full flex-row items-center justify-start gap-2"
                                                variant="ghost"
                                                on:click={toggleMode}
                                        >
                                                <Icon icon={$isDarkMode ? 'i-carbon-moon' : 'i-carbon-sun'} className="text-xl" />
                                                <div>{$isDarkMode ? $UiText.dark : $UiText.light}</div>
                                        </Button>
                                </div>
                                <DialogFooter class="items-end">
                                        <DialogClose>
                                                <Button>{$UiText.close}</Button>
                                        </DialogClose>
                                </DialogFooter>
                        </DialogContent>
                </Dialog>
        </div>
</div>
