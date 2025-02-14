<script lang="ts">
	import { T } from '@threlte/core';
	import { GLTF, OrbitControls } from '@threlte/extras';
</script>

<T.PerspectiveCamera makeDefault position={[5, 2, 5]} fov={25}>
	<OrbitControls autoRotate enableDamping autoRotateSpeed={0.45} />
</T.PerspectiveCamera>

<!-- Directional Light mit geringerer Intensität und besseren Schatteneinstellungen -->
<T.DirectionalLight position={[-5, 2, 1]} intensity={0.3} castShadow />

<GLTF url={'/models/me.glb'} scale={[1, 1, 1]} castShadow receiveShadow />
