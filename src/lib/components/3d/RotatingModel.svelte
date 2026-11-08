<script lang="ts" module>
	import type { ToonVariant } from './toon-avatar';

	export type AvatarVariant = ToonVariant | 'original';
</script>

<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { GLTF, OrbitControls } from '@threlte/extras';
	import { mode } from 'mode-watcher';
	import { base } from '$app/paths';
	import { buildToonAvatar, setOutlineColor } from './toon-avatar';

	let { variant = 'chibi' }: { variant?: AvatarVariant } = $props();

	let isLight = $derived($mode === 'light');

	// Original 3D scan, kept for comparison (static/models/original/)
	let originalDirectional = $derived(isLight ? 0.9 : 0.35);
	let originalAmbient = $derived(isLight ? 0.3 : 0.02);

	// every toon variant is scaled to the same height so one camera fits all
	const TARGET_HEIGHT = 2.2;
	const avatar = variant === 'original' ? undefined : buildToonAvatar(variant);
	if (avatar) avatar.root.scale.setScalar(TARGET_HEIGHT / avatar.height);

	$effect(() => {
		setOutlineColor(isLight ? '#17131c' : '#ece8f6');
	});

	const reducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	let pointerX = 0;
	let pointerY = 0;
	const onPointerMove = (event: PointerEvent) => {
		pointerX = (event.clientX / window.innerWidth) * 2 - 1;
		pointerY = (event.clientY / window.innerHeight) * 2 - 1;
	};

	let time = 0;
	let nextBlink = 2.5;

	useTask((delta) => {
		if (!avatar || reducedMotion) return;
		time += delta;

		// breathing and a gentle sway
		avatar.body.scale.y = 1 + Math.sin(time * 2) * 0.012;
		avatar.root.rotation.y = Math.sin(time * 0.45) * 0.18;

		// the head follows the cursor a little
		const lerp = Math.min(1, delta * 4);
		avatar.head.rotation.y += (pointerX * 0.45 - avatar.head.rotation.y) * lerp;
		avatar.head.rotation.x += (pointerY * 0.2 - avatar.head.rotation.x) * lerp;
		avatar.head.rotation.z = Math.sin(time * 1.3) * 0.04;

		// blink every few seconds
		const blinking = time > nextBlink && time < nextBlink + 0.14;
		for (const eye of avatar.eyes) eye.scale.y = blinking ? 0.12 : 1;
		if (time > nextBlink + 0.14) nextBlink = time + 2.5 + Math.random() * 3;

		// friendly wave
		if (avatar.waveArm) avatar.waveArm.rotation.z = -2.45 + Math.sin(time * 6) * 0.28;
	});
</script>

<svelte:window onpointermove={onPointerMove} />

{#if !avatar}
	<T.PerspectiveCamera makeDefault position={[5, 2, 5]} fov={25}>
		<OrbitControls autoRotate enableDamping autoRotateSpeed={0.45} />
	</T.PerspectiveCamera>

	<T.AmbientLight intensity={originalAmbient} />
	<T.DirectionalLight position={[-15, 0, 0]} intensity={originalDirectional} castShadow />

	<GLTF url={`${base}/models/original/me.glb`} />
{:else}
	<T.PerspectiveCamera makeDefault position={[0, 0.1, 6]} fov={25}>
		<OrbitControls
			enableDamping
			enableZoom={false}
			enablePan={false}
			target={[0, 0, 0]}
			minPolarAngle={1.2}
			maxPolarAngle={1.8}
			minAzimuthAngle={-0.9}
			maxAzimuthAngle={0.9}
		/>
	</T.PerspectiveCamera>

	<T.AmbientLight intensity={isLight ? 1.2 : 1} />
	<T.DirectionalLight position={[3, 4, 5]} intensity={2.2} />
	<T.DirectionalLight position={[-3, 1, 2]} intensity={0.6} color="#dfe6ff" />

	<T is={avatar.root} />
{/if}
