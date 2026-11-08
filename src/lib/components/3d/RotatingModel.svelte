<script lang="ts" module>
	import type { LowPolyVariant } from './lowpoly-avatar';

	export type AvatarVariant = LowPolyVariant | 'original';
</script>

<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { GLTF, OrbitControls } from '@threlte/extras';
	import { mode } from 'mode-watcher';
	import { base } from '$app/paths';
	import { buildLowPolyAvatar } from './lowpoly-avatar';

	let { variant = 'xr' }: { variant?: AvatarVariant } = $props();

	let isLight = $derived($mode === 'light');

	// Original 3D scan, kept for comparison (static/models/original/)
	let originalDirectional = $derived(isLight ? 0.9 : 0.35);
	let originalAmbient = $derived(isLight ? 0.3 : 0.02);

	const avatar = variant === 'original' ? undefined : buildLowPolyAvatar(variant);

	const reducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	let pointerX = 0;
	let pointerY = 0;
	const onPointerMove = (event: PointerEvent) => {
		pointerX = (event.clientX / window.innerWidth) * 2 - 1;
		pointerY = (event.clientY / window.innerHeight) * 2 - 1;
	};

	let time = 0;
	const rest = avatar?.arms.map((arm) => ({
		shoulder: arm.shoulder.rotation.clone(),
		elbow: arm.elbow.rotation.clone()
	}));

	useTask((delta) => {
		if (!avatar || !rest || reducedMotion) return;
		time += delta;

		// breathing, slight weight shift
		const breath = Math.sin(time * 1.6);
		avatar.torso.scale.set(1 + breath * 0.006, 1 + breath * 0.008, 1 + breath * 0.01);
		avatar.root.rotation.y = Math.sin(time * 0.35) * 0.22;
		avatar.root.rotation.z = Math.sin(time * 0.7) * 0.012;

		// the head follows the cursor a little
		const lerp = Math.min(1, delta * 3);
		avatar.head.rotation.y += (pointerX * 0.5 - avatar.root.rotation.y - avatar.head.rotation.y) * lerp;
		avatar.head.rotation.x += (pointerY * 0.18 - avatar.head.rotation.x) * lerp;

		// arms sway gently around their rest pose
		avatar.arms.forEach((arm, i) => {
			const phase = time * 1.6 + i * 0.8;
			arm.shoulder.rotation.x = rest[i].shoulder.x + Math.sin(phase) * 0.03;
			arm.elbow.rotation.x = rest[i].elbow.x + Math.sin(phase + 0.6) * 0.04;
		});
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
	<T.PerspectiveCamera makeDefault position={[0, 0.12, 5.2]} fov={24}>
		<OrbitControls
			enableDamping
			enableZoom={false}
			enablePan={false}
			target={[0, 0.02, 0]}
			minPolarAngle={1.25}
			maxPolarAngle={1.75}
			minAzimuthAngle={-0.8}
			maxAzimuthAngle={0.8}
		/>
	</T.PerspectiveCamera>

	<!-- soft studio light: warm key from the front, cool fill, violet rim from behind -->
	<T.HemisphereLight args={['#e9ecff', isLight ? '#d9d2ec' : '#2a1b55', isLight ? 1.6 : 1.3]} />
	<T.DirectionalLight position={[2, 3, 4]} intensity={2.4} color="#fff1e4" />
	<T.DirectionalLight position={[-3, 1.5, 2]} intensity={0.7} color="#c9d4ff" />
	<T.DirectionalLight position={[-1.5, 2, -3]} intensity={isLight ? 1.5 : 2.6} color="#8b5cf6" />
	<T.DirectionalLight position={[2, 0.5, -3]} intensity={isLight ? 0.8 : 1.4} color="#6d7cff" />

	<T is={avatar.root} />
{/if}
