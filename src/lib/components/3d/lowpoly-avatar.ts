/**
 * Procedural low-poly avatars of Lasse, in a sculpted "flat-shaded" style:
 * lathe-turned body parts (waist, shoulders, elbows, knees), hands with
 * fingers, physically based materials with flat shading and muted colours.
 *
 * Looks are based on a reference photo (short brown hair pushed up, fair skin,
 * ears that stick out a little) and the old 3D scan (grey hoodie, black cap
 * with a purple logo).
 */
import * as THREE from 'three';

export type LowPolyVariant = 'dev' | 'xr';

export type LowPolyAvatar = {
	root: THREE.Group;
	torso: THREE.Group;
	head: THREE.Group;
	arms: Array<{ shoulder: THREE.Group; elbow: THREE.Group; wrist: THREE.Group; side: number }>;
	height: number;
};

const C = {
	skin: '#eebd9f',
	skinShade: '#dfa486',
	hair: '#6a4430',
	tee: '#2b2b33',
	hoodie: '#b8bcc6',
	hoodieShade: '#a3a8b4',
	pants: '#24252e',
	jeans: '#3d4b63',
	shoe: '#e7e6ea',
	sole: '#3a3a44',
	cap: '#1c1c22',
	accent: '#8b5cf6',
	device: '#2c2c35',
	visor: '#7b8cff',
	string: '#ececf1'
};

const materials = new Map<string, THREE.Material>();

const mat = (color: string, options: { emissive?: boolean; double?: boolean } = {}) => {
	const key = `${color}:${options.emissive ? 'e' : ''}${options.double ? 'd' : ''}`;
	if (!materials.has(key)) {
		materials.set(
			key,
			new THREE.MeshStandardMaterial({
				color,
				flatShading: true,
				roughness: 0.82,
				metalness: 0,
				emissive: options.emissive ? color : '#000000',
				emissiveIntensity: options.emissive ? 0.9 : 0,
				side: options.double ? THREE.DoubleSide : THREE.FrontSide
			})
		);
	}
	return materials.get(key)!;
};

type Transform = {
	position?: [number, number, number];
	rotation?: [number, number, number];
	scale?: [number, number, number];
	double?: boolean;
	emissive?: boolean;
};

const mesh = (geometry: THREE.BufferGeometry, color: string, t: Transform = {}) => {
	const m = new THREE.Mesh(geometry, mat(color, { emissive: t.emissive, double: t.double }));
	if (t.position) m.position.set(...t.position);
	if (t.rotation) m.rotation.set(...t.rotation);
	if (t.scale) m.scale.set(...t.scale);
	return m;
};

/** Lathe from [radius, y] pairs, bottom to top. */
const lathe = (points: Array<[number, number]>, segments = 8) =>
	new THREE.LatheGeometry(
		points.map(([r, y]) => new THREE.Vector2(r, y)),
		segments
	);

const group = (position: [number, number, number] = [0, 0, 0], ...children: Array<THREE.Object3D>) => {
	const g = new THREE.Group();
	g.position.set(...position);
	children.forEach((c) => g.add(c));
	return g;
};

// ---------------------------------------------------------------- body parts

const buildHand = (side: number) => {
	const hand = new THREE.Group();
	hand.add(mesh(new THREE.BoxGeometry(0.068, 0.082, 0.028), C.skin, { position: [0, -0.045, 0] }));
	const lengths = [0.058, 0.066, 0.063, 0.052];
	lengths.forEach((length, i) => {
		const x = (-0.0255 + i * 0.017) * side;
		hand.add(
			mesh(new THREE.BoxGeometry(0.015, length, 0.016), C.skin, {
				position: [x, -0.086 - length / 2, 0.004],
				rotation: [0.18, 0, (i - 1.5) * 0.06 * side]
			})
		);
	});
	hand.add(
		mesh(new THREE.BoxGeometry(0.017, 0.048, 0.018), C.skin, {
			position: [-side * 0.04, -0.05, 0.014],
			rotation: [0.3, 0, side * 0.75]
		})
	);
	return hand;
};

const buildArm = (side: number, shoulderY: number, top: 'tee' | 'hoodie') => {
	const U = 0.29;
	const F = 0.26;
	const shoulder = group([side * 0.205, shoulderY, 0]);
	const elbow = group([0, -U, 0]);
	const wrist = group([0, -F, 0]);

	if (top === 'tee') {
		shoulder.add(
			mesh(
				lathe([
					[0, -U - 0.01],
					[0.039, -U],
					[0.047, -U * 0.6],
					[0.052, -0.08],
					[0.05, 0],
					[0, 0.035]
				]),
				C.skin
			)
		);
		// short sleeve
		shoulder.add(
			mesh(
				lathe([
					[0.064, -0.15],
					[0.068, -0.06],
					[0.064, 0.0],
					[0.04, 0.045],
					[0, 0.05]
				]),
				C.tee,
				{ double: true }
			)
		);
		elbow.add(
			mesh(
				lathe([
					[0, -F],
					[0.031, -F + 0.004],
					[0.037, -F * 0.55],
					[0.045, -0.07],
					[0.042, 0],
					[0, 0.025]
				]),
				C.skin
			)
		);
	} else {
		shoulder.add(
			mesh(
				lathe([
					[0, -U - 0.015],
					[0.055, -U],
					[0.062, -U * 0.55],
					[0.068, -0.06],
					[0.062, 0.01],
					[0, 0.05]
				]),
				C.hoodie
			)
		);
		elbow.add(
			mesh(
				lathe([
					[0, -F + 0.01],
					[0.043, -F + 0.012],
					[0.05, -F * 0.5],
					[0.058, -0.05],
					[0.055, 0.01],
					[0, 0.03]
				]),
				C.hoodie
			)
		);
		elbow.add(
			mesh(lathe([[0.04, -F - 0.005], [0.044, -F + 0.03], [0, -F + 0.035]]), C.hoodieShade)
		);
	}

	wrist.add(buildHand(side));
	elbow.add(wrist);
	shoulder.add(elbow);
	return { shoulder, elbow, wrist, side };
};

const buildLegs = (color: string) => {
	const legs = new THREE.Group();
	for (const side of [-1, 1]) {
		const leg = mesh(
			lathe([
				[0, 0.07],
				[0.05, 0.075],
				[0.054, 0.16],
				[0.068, 0.35],
				[0.058, 0.5],
				[0.077, 0.66],
				[0.094, 0.83],
				[0.08, 0.92],
				[0, 0.95]
			]),
			color,
			{ position: [side * 0.092, 0, 0], rotation: [0, 0, side * 0.025] }
		);
		legs.add(leg);
		legs.add(
			mesh(new THREE.IcosahedronGeometry(0.07, 0), C.shoe, {
				position: [side * 0.1, 0.045, 0.045],
				scale: [0.9, 0.62, 1.65]
			})
		);
		legs.add(
			mesh(new THREE.BoxGeometry(0.11, 0.022, 0.24), C.sole, { position: [side * 0.1, 0.011, 0.045] })
		);
	}
	return legs;
};

const buildTorso = (top: 'tee' | 'hoodie') => {
	const torso = new THREE.Group();
	const grow = top === 'hoodie' ? 0.016 : 0;
	const color = top === 'hoodie' ? C.hoodie : C.tee;
	const body = mesh(
		lathe(
			[
				[0, -0.045],
				[0.17 + grow, -0.04],
				[0.174 + grow, -0.01],
				[0.178 + grow, 0.08],
				[0.158 + grow, 0.22],
				[0.178 + grow, 0.35],
				[0.2 + grow, 0.45],
				[0.19 + grow, 0.52],
				[0.09, 0.58],
				[0, 0.585]
			],
			9
		),
		color,
		{ scale: [1, 1, 0.6] }
	);
	torso.add(body);

	if (top === 'hoodie') {
		// pocket, hood, drawstrings
		torso.add(
			mesh(new THREE.BoxGeometry(0.22, 0.11, 0.02), C.hoodieShade, {
				position: [0, 0.1, 0.105],
				rotation: [-0.08, 0, 0]
			})
		);
		torso.add(
			mesh(new THREE.TorusGeometry(0.1, 0.045, 5, 9), C.hoodie, {
				position: [0, 0.57, -0.035],
				rotation: [Math.PI / 2 + 0.45, 0, 0],
				scale: [1.15, 1, 1]
			})
		);
		for (const side of [-1, 1]) {
			torso.add(
				mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.13, 4), C.string, {
					position: [side * 0.035, 0.47, 0.105],
					rotation: [-0.12, 0, 0]
				})
			);
		}
	}

	return torso;
};

const buildHead = (outfit: { cap?: boolean; headset?: boolean }) => {
	const head = new THREE.Group();

	// skull and jaw, a bit deeper than wide
	head.add(
		mesh(
			lathe(
				[
					[0, -0.135],
					[0.045, -0.13],
					[0.082, -0.095],
					[0.1, -0.035],
					[0.106, 0.04],
					[0.1, 0.1],
					[0.076, 0.145],
					[0.035, 0.165],
					[0, 0.168]
				],
				9
			),
			C.skin,
			{ scale: [1, 1, 1.08] }
		)
	);

	// ears that stick out a little
	for (const side of [-1, 1]) {
		head.add(
			mesh(new THREE.IcosahedronGeometry(0.03, 0), C.skinShade, {
				position: [side * 0.106, 0.0, -0.005],
				scale: [0.45, 1.05, 0.75],
				rotation: [0, side * 0.45, 0]
			})
		);
	}

	// no eyes or mouth (like the reference style), just a soft nose
	head.add(
		mesh(new THREE.IcosahedronGeometry(0.022, 0), C.skin, {
			position: [0, -0.02, 0.108],
			scale: [0.7, 1.1, 0.9]
		})
	);

	if (outfit.cap) {
		head.add(
			mesh(new THREE.SphereGeometry(0.126, 10, 5, 0, Math.PI * 2, 0, Math.PI * 0.5), C.cap, {
				position: [0, 0.03, -0.004],
				scale: [1, 1.2, 1.16]
			})
		);
		head.add(
			mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.012, 8, 1, false, -Math.PI / 2, Math.PI), C.cap, {
				position: [0, 0.05, 0.115],
				rotation: [0.18, 0, 0],
				scale: [1.05, 1, 1.05]
			})
		);
		head.add(
			mesh(new THREE.BoxGeometry(0.06, 0.026, 0.006), C.accent, {
				position: [0, 0.105, 0.118],
				rotation: [-0.45, 0, 0]
			})
		);
		// hair at the sides and back under the cap
		head.add(
			mesh(new THREE.SphereGeometry(0.112, 9, 5, Math.PI * 0.75, Math.PI * 1.5, Math.PI * 0.3, Math.PI * 0.22), C.hair, {
				scale: [1, 1, 1.08],
				double: true
			})
		);
	} else {
		// short sides, longer top pushed up at the front, free forehead
		const hair = mesh(new THREE.SphereGeometry(0.114, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.46), C.hair, {
			position: [0, 0.03, -0.012],
			rotation: [-0.32, 0, 0],
			scale: [1, 1.05, 1.08]
		});
		head.add(hair);
		const tufts: Array<[number, number, number, number]> = [
			[-0.045, 0.15, 0.06, 0.4],
			[0.0, 0.162, 0.07, 0.5],
			[0.045, 0.15, 0.06, 0.4],
			[-0.02, 0.17, 0.0, 0.1],
			[0.03, 0.168, -0.01, 0.1]
		];
		for (const [x, y, z, tilt] of tufts) {
			head.add(
				mesh(new THREE.IcosahedronGeometry(0.04, 0), C.hair, {
					position: [x, y, z],
					rotation: [tilt, x * 6, 0],
					scale: [1, 0.6, 1.1]
				})
			);
		}
	}

	if (outfit.headset) {
		// VR headset pushed up onto the forehead, strap around the head
		const headset = group([0, 0.13, 0.075]);
		headset.rotation.x = -0.6;
		headset.add(
			mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8), C.device, {
				rotation: [0, 0, Math.PI / 2],
				scale: [1, 1, 1.25]
			})
		);
		headset.add(
			mesh(new THREE.BoxGeometry(0.17, 0.07, 0.01), C.visor, { position: [0, 0, 0.074], emissive: true })
		);
		head.add(headset);
		head.add(
			mesh(new THREE.TorusGeometry(0.113, 0.011, 4, 14), C.device, {
				position: [0, 0.075, -0.01],
				rotation: [Math.PI / 2 - 0.5, 0, 0],
				scale: [1, 1.12, 1]
			})
		);
	}

	return head;
};

const buildController = () => {
	const controller = new THREE.Group();
	controller.add(mesh(new THREE.CylinderGeometry(0.016, 0.019, 0.1, 6), C.device, { position: [0, -0.06, 0.02] }));
	controller.add(
		mesh(new THREE.TorusGeometry(0.045, 0.008, 4, 10), C.visor, {
			position: [0, -0.02, 0.07],
			rotation: [0.4, 0, 0],
			emissive: true
		})
	);
	return controller;
};

// ------------------------------------------------------------------ figures

const buildFigure = (outfit: {
	top: 'tee' | 'hoodie';
	legs: string;
	cap?: boolean;
	headset?: boolean;
	controllers?: boolean;
}): LowPolyAvatar => {
	const root = new THREE.Group();
	const figure = new THREE.Group();
	root.add(figure);

	figure.add(buildLegs(outfit.legs));

	const hipY = 0.88;
	const torso = group([0, hipY, 0], buildTorso(outfit.top));
	figure.add(torso);

	const shoulderY = 0.5;
	const arms = [-1, 1].map((side) => buildArm(side, shoulderY, outfit.top));
	arms.forEach((arm) => torso.add(arm.shoulder));

	torso.add(
		mesh(
			lathe([
				[0.048, 0],
				[0.052, 0.075],
				[0, 0.09]
			]),
			C.skinShade,
			{ position: [0, 0.55, 0] }
		)
	);

	const head = buildHead(outfit);
	head.scale.setScalar(1.22);
	head.position.set(0, 0.8, 0.005);
	torso.add(head);

	// relaxed pose like in the reference: arms slightly out, open hands
	for (const arm of arms) {
		const s = arm.side;
		if (outfit.controllers) {
			arm.shoulder.rotation.set(-0.15, 0, s * 0.16);
			arm.elbow.rotation.set(-1.25, 0, 0);
			arm.wrist.rotation.set(0.15, s * -0.4, 0);
			const controller = buildController();
			controller.position.set(0, -0.05, 0.02);
			arm.wrist.add(controller);
		} else {
			arm.shoulder.rotation.set(0.05, 0, s * 0.2);
			arm.elbow.rotation.set(-0.35, 0, s * -0.05);
			arm.wrist.rotation.set(0, s * -0.9, s * 0.15);
		}
	}

	const height = 1.86;
	figure.position.y = -height / 2;
	return { root, torso, head, arms, height };
};

export const buildLowPolyAvatar = (variant: LowPolyVariant): LowPolyAvatar =>
	variant === 'dev'
		? buildFigure({ top: 'hoodie', legs: C.pants, cap: true })
		: buildFigure({ top: 'tee', legs: C.jeans, headset: true, controllers: true });
