/**
 * Procedural low-poly, comic-style avatars of Lasse.
 *
 * Built from three.js primitives: faceted (flat-shaded) geometry, a 3-step
 * toon ramp and an inverted-hull outline. Looks are based on a reference photo
 * (short brown hair with a longer top, blue-grey eyes, fair skin, ears that
 * stick out a little, black tee) and the old 3D scan (grey hoodie, black cap
 * with a purple logo).
 */
import * as THREE from 'three';

export type ToonVariant = 'chibi' | 'dev' | 'xr';

export type ToonAvatar = {
	root: THREE.Group;
	/** animated parts */
	body: THREE.Group;
	head: THREE.Group;
	eyes: Array<THREE.Object3D>;
	waveArm?: THREE.Group;
	height: number;
};

const COLORS = {
	skin: '#f2c9ad',
	skinShade: '#e7ae92',
	blush: '#f19a8f',
	hair: '#6e4b33',
	hairDark: '#5a3b27',
	eye: '#3f5568',
	iris: '#7f9db4',
	brow: '#5a3b27',
	mouth: '#8a3d3d',
	outline: '#17131c',
	tee: '#1f1f26',
	hoodie: '#c9ccd3',
	hoodieShade: '#b3b7c0',
	pants: '#3c3f4c',
	jeans: '#41536e',
	shoe: '#ecebef',
	sole: '#2b2b33',
	cap: '#1b1b21',
	accent: '#8b5cf6',
	headset: '#2a2a33',
	visor: '#6d7cff'
};

let ramp: THREE.DataTexture | undefined;

const toonRamp = () => {
	if (ramp) return ramp;
	const steps = new Uint8Array([90, 170, 255]);
	ramp = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat);
	ramp.minFilter = THREE.NearestFilter;
	ramp.magFilter = THREE.NearestFilter;
	ramp.needsUpdate = true;
	return ramp;
};

const materials = new Map<string, THREE.Material>();

const toon = (color: string) => {
	const key = `toon:${color}`;
	if (!materials.has(key)) {
		materials.set(key, new THREE.MeshToonMaterial({ color, gradientMap: toonRamp() }));
	}
	return materials.get(key)!;
};

const flat = (color: string, opacity = 1) => {
	const key = `flat:${color}:${opacity}`;
	if (!materials.has(key)) {
		materials.set(
			key,
			new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity === 1 })
		);
	}
	return materials.get(key)!;
};

/** Dark outlines on light backgrounds, light "sticker" outlines on dark ones. */
export const setOutlineColor = (color: string) => {
	(outlineMaterial() as THREE.MeshBasicMaterial).color.set(color);
};

const outlineMaterial = () => {
	const key = 'outline';
	if (!materials.has(key)) {
		materials.set(key, new THREE.MeshBasicMaterial({ color: COLORS.outline, side: THREE.BackSide }));
	}
	return materials.get(key)!;
};

/** Flat normals for the faceted low-poly look. */
const facet = (geometry: THREE.BufferGeometry) => {
	const out = geometry.index ? geometry.toNonIndexed() : geometry;
	out.computeVertexNormals();
	return out;
};

type PartOptions = {
	position?: [number, number, number];
	rotation?: [number, number, number];
	scale?: [number, number, number];
	outline?: number | false;
	material?: THREE.Material;
};

/** A faceted toon mesh with an optional inverted-hull outline. */
const part = (geometry: THREE.BufferGeometry, color: string, options: PartOptions = {}) => {
	const group = new THREE.Group();
	const geo = facet(geometry);
	const mesh = new THREE.Mesh(geo, options.material ?? toon(color));
	group.add(mesh);

	if (options.outline !== false) {
		const hull = new THREE.Mesh(geo, outlineMaterial());
		hull.scale.setScalar(options.outline ?? 1.06);
		group.add(hull);
	}

	if (options.position) group.position.set(...options.position);
	if (options.rotation) group.rotation.set(...options.rotation);
	if (options.scale) group.scale.set(...options.scale);
	return group;
};

type Proportions = {
	headR: number;
	torsoH: number;
	torsoW: number;
	legH: number;
	armL: number;
};

type Outfit = {
	top: 'tee' | 'hoodie';
	legs: string;
	cap?: boolean;
	headset?: boolean;
	wave?: boolean;
	controllers?: boolean;
};

const buildHead = (r: number, outfit: Outfit) => {
	const head = new THREE.Group();

	// skull, slightly taller than wide
	head.add(part(new THREE.IcosahedronGeometry(r, 1), COLORS.skin, { scale: [1, 1.07, 0.96], outline: 1.04 }));

	// ears that stick out a little (like in the photo)
	for (const side of [-1, 1]) {
		head.add(
			part(new THREE.IcosahedronGeometry(r * 0.2, 0), COLORS.skinShade, {
				position: [side * r * 0.98, -r * 0.02, -r * 0.05],
				scale: [0.55, 1, 0.75],
				rotation: [0, side * 0.5, 0],
				outline: 1.12
			})
		);
	}

	// hair: short sides, more volume on top swept up at the front
	if (!outfit.cap) {
		head.add(
			part(new THREE.SphereGeometry(r * 1.05, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.36), COLORS.hair, {
				position: [0, r * 0.14, -r * 0.06],
				scale: [1, 1.05, 1],
				outline: 1.04
			})
		);
		const tufts: Array<[number, number, number, number]> = [
			// x, y, z, forward tilt: short textured top pushed up at the front
			[-0.32, 0.92, 0.42, 0.25],
			[0, 1.0, 0.45, 0.3],
			[0.32, 0.92, 0.42, 0.25],
			[-0.16, 1.08, 0.12, 0.1],
			[0.18, 1.08, 0.12, 0.1],
			[0, 1.05, -0.25, -0.2]
		];
		for (const [x, y, z, tilt] of tufts) {
			head.add(
				part(new THREE.ConeGeometry(r * 0.24, r * 0.42, 4), COLORS.hair, {
					position: [x * r, y * r, z * r],
					rotation: [tilt, 0, -x * 0.6],
					outline: 1.08
				})
			);
		}
		// faded sides
		head.add(
			part(new THREE.SphereGeometry(r * 1.015, 9, 6, Math.PI * 0.85, Math.PI * 1.3, Math.PI * 0.22, Math.PI * 0.3), COLORS.hairDark, {
				outline: false
			})
		);
	} else {
		// a bit of hair peeking out under the cap
		head.add(
			part(new THREE.SphereGeometry(r * 1.02, 9, 6, Math.PI * 0.7, Math.PI * 1.6, Math.PI * 0.25, Math.PI * 0.27), COLORS.hairDark, {
				outline: false
			})
		);
		// cap crown, brim and logo
		head.add(
			part(new THREE.SphereGeometry(r * 1.08, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.5), COLORS.cap, {
				position: [0, r * 0.22, -r * 0.02],
				scale: [1, 0.72, 1],
				outline: 1.04
			})
		);
		head.add(
			part(new THREE.CylinderGeometry(r * 0.7, r * 0.7, r * 0.08, 8, 1, false, -Math.PI / 2, Math.PI), COLORS.cap, {
				position: [0, r * 0.3, r * 0.82],
				rotation: [0.32, 0, 0],
				scale: [1.05, 1, 0.95],
				outline: 1.1
			})
		);
		head.add(
			part(new THREE.BoxGeometry(r * 0.5, r * 0.2, r * 0.05), COLORS.accent, {
				position: [0, r * 0.62, r * 0.84],
				rotation: [-0.55, 0, 0],
				outline: false
			})
		);
	}

	// friendly face: big eyes with a highlight, raised brows, smile, blush
	const eyes: Array<THREE.Object3D> = [];
	for (const side of [-1, 1]) {
		const eye = new THREE.Group();
		eye.position.set(side * r * 0.36, r * 0.02, r * 0.86);
		eye.add(part(new THREE.SphereGeometry(r * 0.15, 8, 6), COLORS.eye, { scale: [0.85, 1.15, 0.4], outline: false }));
		eye.add(
			part(new THREE.SphereGeometry(r * 0.1, 8, 6), COLORS.iris, {
				position: [0, -r * 0.035, r * 0.04],
				scale: [0.8, 0.8, 0.3],
				outline: false
			})
		);
		eye.add(
			part(new THREE.SphereGeometry(r * 0.05, 6, 4), '#ffffff', {
				position: [side * -r * 0.04, r * 0.06, r * 0.07],
				outline: false,
				material: flat('#ffffff')
			})
		);
		head.add(eye);
		eyes.push(eye);

		head.add(
			part(new THREE.BoxGeometry(r * 0.32, r * 0.06, r * 0.06), COLORS.brow, {
				position: [side * r * 0.36, r * 0.32, r * 0.88],
				rotation: [0, 0, side * -0.12],
				outline: false
			})
		);
		head.add(
			part(new THREE.SphereGeometry(r * 0.13, 8, 5), COLORS.blush, {
				position: [side * r * 0.58, -r * 0.25, r * 0.74],
				scale: [1, 0.6, 0.3],
				outline: false,
				material: flat(COLORS.blush, 0.55)
			})
		);
	}

	head.add(
		part(new THREE.ConeGeometry(r * 0.09, r * 0.2, 4), COLORS.skinShade, {
			position: [0, -r * 0.1, r * 0.98],
			rotation: [Math.PI / 2 + 0.25, 0, 0],
			outline: false
		})
	);

	// open smile: half disc (mouth) with a little tongue
	head.add(
		part(new THREE.CircleGeometry(r * 0.2, 8, Math.PI, Math.PI), COLORS.mouth, {
			position: [0, -r * 0.3, r * 0.92],
			rotation: [-0.15, 0, 0],
			outline: false,
			material: flat(COLORS.mouth)
		})
	);
	head.add(
		part(new THREE.CircleGeometry(r * 0.09, 6, Math.PI, Math.PI), '#e07a78', {
			position: [0, -r * 0.42, r * 0.935],
			rotation: [-0.15, 0, 0],
			outline: false,
			material: flat('#e07a78')
		})
	);

	if (outfit.headset) {
		// VR headset pushed up onto the forehead
		const headset = new THREE.Group();
		headset.add(part(new THREE.BoxGeometry(r * 1.25, r * 0.48, r * 0.55), COLORS.headset, { outline: 1.05 }));
		headset.add(
			part(new THREE.BoxGeometry(r * 1.1, r * 0.34, r * 0.06), COLORS.visor, {
				position: [0, 0, r * 0.29],
				outline: false,
				material: new THREE.MeshBasicMaterial({ color: COLORS.visor })
			})
		);
		headset.position.set(0, r * 0.78, r * 0.55);
		headset.rotation.x = -0.55;
		head.add(headset);
		head.add(
			part(new THREE.TorusGeometry(r * 1.03, r * 0.06, 4, 14), COLORS.headset, {
				position: [0, r * 0.62, 0],
				rotation: [Math.PI / 2 - 0.35, 0, 0],
				outline: false
			})
		);
	}

	return { head, eyes };
};

const buildFigure = (p: Proportions, outfit: Outfit): ToonAvatar => {
	const root = new THREE.Group();
	const body = new THREE.Group();
	root.add(body);

	const top = outfit.top === 'hoodie' ? COLORS.hoodie : COLORS.tee;
	const legX = p.torsoW * 0.22;

	// legs and shoes
	for (const side of [-1, 1]) {
		body.add(
			part(new THREE.CylinderGeometry(p.torsoW * 0.17, p.torsoW * 0.15, p.legH, 6), outfit.legs, {
				position: [side * legX, p.legH / 2 + 0.06, 0]
			})
		);
		body.add(
			part(new THREE.BoxGeometry(p.torsoW * 0.32, 0.1, p.torsoW * 0.5), COLORS.shoe, {
				position: [side * legX, 0.06, p.torsoW * 0.08]
			})
		);
		body.add(
			part(new THREE.BoxGeometry(p.torsoW * 0.33, 0.035, p.torsoW * 0.52), COLORS.sole, {
				position: [side * legX, 0.015, p.torsoW * 0.08],
				outline: false
			})
		);
	}

	// torso
	const hipY = p.legH + 0.06;
	const torso = part(new THREE.CylinderGeometry(p.torsoW * 0.5, p.torsoW * 0.44, p.torsoH, 7), top, {
		position: [0, hipY + p.torsoH / 2, 0],
		outline: 1.04
	});
	body.add(torso);

	const shoulderY = hipY + p.torsoH - p.torsoW * 0.12;

	if (outfit.top === 'hoodie') {
		// pocket, hood and drawstrings
		body.add(
			part(new THREE.BoxGeometry(p.torsoW * 0.6, p.torsoH * 0.25, 0.04), COLORS.hoodieShade, {
				position: [0, hipY + p.torsoH * 0.22, p.torsoW * 0.46],
				outline: false
			})
		);
		body.add(
			part(new THREE.TorusGeometry(p.torsoW * 0.3, p.torsoW * 0.1, 5, 10), COLORS.hoodie, {
				position: [0, hipY + p.torsoH, -p.torsoW * 0.06],
				rotation: [Math.PI / 2 + 0.3, 0, 0],
				outline: 1.05
			})
		);
		for (const side of [-1, 1]) {
			body.add(
				part(new THREE.CylinderGeometry(0.012, 0.012, p.torsoH * 0.25, 4), '#f4f4f6', {
					position: [side * p.torsoW * 0.1, hipY + p.torsoH * 0.82, p.torsoW * 0.48],
					outline: false
				})
			);
		}
	} else {
		// small accent print on the tee
		body.add(
			part(new THREE.CircleGeometry(p.torsoW * 0.1, 6), COLORS.accent, {
				position: [p.torsoW * 0.2, hipY + p.torsoH * 0.72, p.torsoW * 0.485],
				outline: false,
				material: flat(COLORS.accent)
			})
		);
	}

	// neck
	body.add(
		part(new THREE.CylinderGeometry(p.headR * 0.28, p.headR * 0.3, p.headR * 0.35, 6), COLORS.skinShade, {
			position: [0, hipY + p.torsoH + p.headR * 0.1, 0],
			outline: false
		})
	);

	// arms: pivot at the shoulder, hanging down
	let waveArm: THREE.Group | undefined;
	for (const side of [-1, 1]) {
		const pivot = new THREE.Group();
		pivot.position.set(side * (p.torsoW * 0.5 + 0.03), shoulderY, 0);
		pivot.rotation.z = side * 0.12;

		const sleeveL = outfit.top === 'hoodie' ? p.armL * 0.92 : p.armL * 0.38;
		pivot.add(
			part(new THREE.CylinderGeometry(p.torsoW * 0.13, p.torsoW * 0.11, sleeveL, 6), top, {
				position: [0, -sleeveL / 2, 0]
			})
		);
		if (outfit.top === 'tee') {
			const forearm = p.armL - sleeveL;
			pivot.add(
				part(new THREE.CylinderGeometry(p.torsoW * 0.075, p.torsoW * 0.065, forearm, 6), COLORS.skin, {
					position: [0, -sleeveL - forearm / 2 + 0.01, 0]
				})
			);
		}
		pivot.add(
			part(new THREE.IcosahedronGeometry(p.torsoW * 0.11, 0), COLORS.skin, {
				position: [0, -p.armL - p.torsoW * 0.05, 0]
			})
		);
		body.add(pivot);

		if (outfit.wave && side === -1) {
			pivot.rotation.z = -2.5;
			waveArm = pivot;
		}

		if (outfit.controllers) {
			// arms forward, a VR controller in each hand
			pivot.rotation.set(-1.0, 0, side * 0.25);
			const controller = new THREE.Group();
			controller.add(part(new THREE.BoxGeometry(p.torsoW * 0.12, p.torsoW * 0.32, p.torsoW * 0.12), COLORS.headset, { outline: 1.12 }));
			controller.add(
				part(new THREE.TorusGeometry(p.torsoW * 0.12, p.torsoW * 0.025, 4, 10), COLORS.visor, {
					position: [0, -p.torsoW * 0.2, 0],
					rotation: [Math.PI / 2, 0, 0],
					outline: false,
					material: new THREE.MeshBasicMaterial({ color: COLORS.visor })
				})
			);
			controller.position.set(0, -p.armL - p.torsoW * 0.12, 0);
			pivot.add(controller);
		}
	}

	const { head, eyes } = buildHead(p.headR, outfit);
	head.position.set(0, hipY + p.torsoH + p.headR * 1.05, 0);
	body.add(head);

	const height = hipY + p.torsoH + p.headR * 2.2 + (outfit.cap || outfit.headset ? p.headR * 0.25 : 0);
	// centre vertically so the camera can frame every variant the same way
	body.position.y = -height / 2;

	return { root, body, head, eyes, waveArm, height };
};

export const buildToonAvatar = (variant: ToonVariant): ToonAvatar => {
	switch (variant) {
		case 'chibi':
			// big head, tiny body, black tee like in the photo, waving
			return buildFigure(
				{ headR: 0.5, torsoH: 0.55, torsoW: 0.62, legH: 0.42, armL: 0.48 },
				{ top: 'tee', legs: COLORS.jeans, wave: true }
			);
		case 'dev':
			// grey hoodie and black cap with the purple logo, like the scan
			return buildFigure(
				{ headR: 0.36, torsoH: 0.78, torsoW: 0.66, legH: 0.78, armL: 0.72 },
				{ top: 'hoodie', legs: COLORS.pants, cap: true }
			);
		case 'xr':
			// WebXR developer: VR headset pushed up, black tee, waving
			return buildFigure(
				{ headR: 0.4, torsoH: 0.7, torsoW: 0.62, legH: 0.68, armL: 0.64 },
				{ top: 'tee', legs: COLORS.jeans, headset: true, controllers: true }
			);
	}
};
