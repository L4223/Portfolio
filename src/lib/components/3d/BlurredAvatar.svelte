<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { mode } from 'mode-watcher';
	import { onDestroy } from 'svelte';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
	import { NoToneMapping } from 'three';
	import { buildAvatar } from './avatar';
	import { createBlurPasses } from './blur-pass';

	/** blur strength (Gaussian sigma) in CSS pixels */
	const BLUR = 6.7;

	let isLight = $derived($mode === 'light');

	// --- render with a Gaussian blur inside WebGL (no CSS filter, so it looks the
	// same in every browser). The canvas is opaque in the page background colour.
	const { renderer, scene, camera, size, autoRender, renderStage } = useThrelte();
	const composer = new EffectComposer(renderer);
	const renderPass = new RenderPass(scene, camera.current);
	const blur = createBlurPasses();
	composer.addPass(renderPass);
	blur.passes.forEach((pass) => composer.addPass(pass));
	composer.addPass(new OutputPass());

	// no tone mapping: the backdrop must come out exactly as the page colour
	renderer.toneMapping = NoToneMapping;

	$effect(() => {
		renderer.setClearColor(isLight ? '#ffffff' : '#000000', 1);
	});

	$effect(() => {
		const { width, height } = $size;
		const ratio = renderer.getPixelRatio();
		composer.setPixelRatio(ratio);
		composer.setSize(width, height);
		blur.update(width * ratio, height * ratio, BLUR, ratio);
	});

	const previousAutoRender = autoRender.current;
	autoRender.set(false);
	onDestroy(() => {
		autoRender.set(previousAutoRender);
		composer.dispose();
	});

	const renderFrame = () => {
		renderPass.camera = camera.current;
		composer.render();
	};

	useTask(
		() => renderFrame(),
		{ stage: renderStage, autoInvalidate: false }
	);

	const avatar = buildAvatar();

	const reducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// pointer in -1..1, relative to the window
	let pointerX = 0;
	let pointerY = 0;
	const onPointerMove = (event: PointerEvent) => {
		pointerX = (event.clientX / window.innerWidth) * 2 - 1;
		pointerY = (event.clientY / window.innerHeight) * 2 - 1;
	};

	let time = 0;
	const rest = avatar.arms.map((arm) => ({
		shoulderX: arm.shoulder.rotation.x,
		shoulderZ: arm.shoulder.rotation.z,
		elbowX: arm.elbow.rotation.x
	}));

	useTask((delta) => {
		time += delta;
		const motion = reducedMotion ? 0 : 1;

		// idle: breathing, slight weight shift, arms drift a little
		const breath = Math.sin(time * 1.5) * motion;
		avatar.torso.scale.set(1 + breath * 0.008, 1 + breath * 0.01, 1 + breath * 0.012);
		avatar.root.rotation.z = Math.sin(time * 0.6) * 0.015 * motion;
		avatar.root.position.y = Math.sin(time * 1.5) * 0.004 * motion;
		avatar.arms.forEach((arm, i) => {
			const phase = time * 1.5 + i * 0.9;
			arm.shoulder.rotation.x = rest[i].shoulderX + Math.sin(phase) * 0.04 * motion;
			arm.shoulder.rotation.z = rest[i].shoulderZ + Math.sin(phase * 0.7) * 0.03 * motion;
			arm.elbow.rotation.x = rest[i].elbowX + Math.sin(phase + 0.5) * 0.05 * motion;
		});

		// look at the pointer: head turns most, upper body follows a bit
		const lerp = Math.min(1, delta * 3.5);
		const lookY = pointerX * 0.6;
		const lookX = pointerY * 0.25;
		avatar.head.rotation.y += (lookY - avatar.head.rotation.y) * lerp;
		avatar.head.rotation.x += (lookX - avatar.head.rotation.x) * lerp;
		avatar.torso.rotation.y += (lookY * 0.25 - avatar.torso.rotation.y) * lerp;
	});
</script>

<svelte:window onpointermove={onPointerMove} />

<T.PerspectiveCamera makeDefault position={[0, 0.06, 5.35]} fov={24}>
	<!-- drag to turn the figure around; no zoom or pan -->
	<OrbitControls
		enableDamping
		dampingFactor={0.08}
		enableZoom={false}
		enablePan={false}
		target={[0, 0, 0]}
		minPolarAngle={1.35}
		maxPolarAngle={1.75}
		rotateSpeed={0.7}
	/>
</T.PerspectiveCamera>

<!-- dimmer light from the right, so the left side of the figure falls into shadow -->
<T.HemisphereLight args={['#ffffff', '#d9d6d2', isLight ? 0.8 : 0.9]} />
<T.DirectionalLight position={[3.5, 2.5, 2.5]} intensity={1.6} color="#fff6ee" />
<T.DirectionalLight position={[-3, 1.5, 2]} intensity={0.12} color="#f4f6ff" />
<T.DirectionalLight position={[1, 2.5, -4]} intensity={0.5} color="#ffffff" />

<T is={avatar.root} />
