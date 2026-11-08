<script lang="ts" module>
	export type AvatarVariant = 'warm' | 'studio' | 'original';
</script>

<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { GLTF, OrbitControls } from '@threlte/extras';
	import { mode } from 'mode-watcher';
	import { base } from '$app/paths';

	let { variant = 'warm' }: { variant?: AvatarVariant } = $props();

	let isLight = $derived($mode === 'light');

	// Original scene, kept for comparison (see static/models/original/)
	let originalDirectional = $derived(isLight ? 0.9 : 0.35);
	let originalAmbient = $derived(isLight ? 0.3 : 0.02);

	const reducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Gentle idle motion: the avatar faces the visitor and sways instead of
	// spinning (a full turn mostly shows the back, which feels distant).
	let time = 0;
	let rotationY = $state(0);
	let offsetY = $state(0);
	let pointerX = 0;
	let pointerY = 0;

	const onPointerMove = (event: PointerEvent) => {
		pointerX = (event.clientX / window.innerWidth) * 2 - 1;
		pointerY = (event.clientY / window.innerHeight) * 2 - 1;
	};

	useTask((delta) => {
		if (variant === 'original' || reducedMotion) return;
		time += delta;

		if (variant === 'warm') {
			rotationY = Math.sin(time * 0.5) * 0.45;
			offsetY = Math.sin(time * 1.2) * 0.012;
		} else {
			// studio: slow breathing, turns a little towards the cursor
			const target = pointerX * 0.5;
			rotationY += (target - rotationY) * Math.min(1, delta * 2.5);
			offsetY = Math.sin(time * 1.1) * 0.01 - pointerY * 0.01;
		}
	});
</script>

<svelte:window onpointermove={variant === 'studio' ? onPointerMove : undefined} />

{#if variant === 'original'}
	<T.PerspectiveCamera makeDefault position={[5, 2, 5]} fov={25}>
		<OrbitControls autoRotate enableDamping autoRotateSpeed={0.45} />
	</T.PerspectiveCamera>

	<T.AmbientLight intensity={originalAmbient} />
	<T.DirectionalLight position={[-15, 0, 0]} intensity={originalDirectional} castShadow />

	<GLTF url={`${base}/models/original/me.glb`} />
{:else if variant === 'warm'}
	<!-- full body, warm key light from the front, cool rim light from behind -->
	<T.PerspectiveCamera makeDefault position={[0, 0.35, 5.6]} fov={22}>
		<OrbitControls
			enableDamping
			enableZoom={false}
			enablePan={false}
			target={[0, 0.05, 0]}
			minPolarAngle={1.2}
			maxPolarAngle={1.75}
		/>
	</T.PerspectiveCamera>

	<T.HemisphereLight args={['#fff4e6', '#3a3550', isLight ? 1.1 : 0.9]} />
	<T.DirectionalLight position={[2.5, 3, 4]} intensity={isLight ? 2.2 : 2} color="#ffe2c4" />
	<T.DirectionalLight position={[-3, 1, 2]} intensity={0.7} color="#dce8ff" />
	<T.DirectionalLight position={[0, 2.5, -4]} intensity={1.4} color="#9ec5ff" />
	<!-- soft fill from below the face, so the cap doesn't shadow the eyes -->
	<T.PointLight position={[0, 0.55, 1.2]} intensity={5} distance={3} color="#ffe9d6" />

	<T.Group rotation.y={rotationY} position.y={offsetY}>
		<GLTF url={`${base}/models/me-warm.glb`} />
	</T.Group>
{:else}
	<!-- head-and-shoulders portrait, soft high-key light like a photo studio -->
	<T.PerspectiveCamera makeDefault position={[0, 0.72, 3.5]} fov={20}>
		<OrbitControls
			enableDamping
			enableZoom={false}
			enablePan={false}
			enableRotate={false}
			target={[0, 0.56, 0]}
		/>
	</T.PerspectiveCamera>

	<T.HemisphereLight args={['#ffffff', '#c9d2e0', isLight ? 1.5 : 1.3]} />
	<T.DirectionalLight position={[1.5, 2, 4]} intensity={1.8} color="#ffffff" />
	<T.DirectionalLight position={[-2.5, 1, 3]} intensity={1.1} color="#f2f6ff" />
	<T.DirectionalLight position={[0, 2, -3]} intensity={1.6} color="#ffffff" />
	<T.PointLight position={[0, 0.6, 1]} intensity={5} distance={2.5} color="#ffffff" />

	<T.Group rotation.y={rotationY} position.y={offsetY}>
		<GLTF url={`${base}/models/me-studio.glb`} />
	</T.Group>
{/if}
