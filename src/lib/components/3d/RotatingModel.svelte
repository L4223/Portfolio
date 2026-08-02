<script lang="ts">
	import { T } from '@threlte/core';
	import { GLTF, OrbitControls } from '@threlte/extras';
	import { mode } from 'mode-watcher';

	let isLightMode = $derived($mode === 'light');
	let directionalIntensity = $derived(isLightMode ? 0.9 : 0.35);
	let ambientIntensity = $derived(isLightMode ? 0.3 : 0.02);
</script>

<T.PerspectiveCamera makeDefault position={[5, 2, 5]} fov={25}>
	<OrbitControls autoRotate enableDamping autoRotateSpeed={0.45} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={ambientIntensity} />
<T.DirectionalLight position={[-15, 0, 0]} intensity={directionalIntensity} castShadow />

<GLTF url={'/models/me.glb'} scale={[1, 1, 1]} castShadow receiveShadow />
