/**
 * Procedural 3D avatar of Lasse, modelled after a full-body reference photo:
 * black tee, wide black jeans, dark sneakers with white stripes and a gum sole,
 * short light-brown hair, fair skin, arms slightly spread with open palms.
 *
 * It's shown heavily blurred (Gaussian blur in WebGL), so silhouette, colours
 * and pose matter far more than surface detail.
 */
import * as THREE from 'three';

export type Avatar = {
	root: THREE.Group;
	torso: THREE.Group;
	head: THREE.Group;
	arms: Array<{ shoulder: THREE.Group; elbow: THREE.Group; wrist: THREE.Group; side: number }>;
	height: number;
};

const C = {
	skin: '#e8b89c',
	skinShade: '#d9a487',
	hair: '#5a4231',
	brow: '#4a3527',
	eyeWhite: '#f7f4f0',
	iris: '#5f7d96',
	pupil: '#1c1c22',
	lips: '#c98b7c',
	tee: '#151518',
	jeans: '#1e1e23',
	shoe: '#26262c',
	stripe: '#ececf0',
	sole: '#6e5342'
};

const materials = new Map<string, THREE.Material>();

const mat = (color: string, options: { emissive?: boolean; double?: boolean } = {}) => {
	const key = `${color}:${options.emissive ? 'e' : ''}${options.double ? 'd' : ''}`;
	if (!materials.has(key)) {
		materials.set(
			key,
			new THREE.MeshStandardMaterial({
				color,
				flatShading: false,
				roughness: 0.72,
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lathe = (points: Array<[number, number]>, _segments?: number) => {
	// interpolate the profile with a spline so the outline is round, not faceted
	const curve = new THREE.SplineCurve(points.map(([r, y]) => new THREE.Vector2(r, y)));
	const smooth = curve.getPoints(points.length * 6).map((p) => new THREE.Vector2(Math.max(0, p.x), p.y));
	return new THREE.LatheGeometry(smooth, 32);
};

/** A smooth sphere (instead of a low-poly icosahedron). */
const ball = (radius: number) => new THREE.SphereGeometry(radius, 24, 16);

/** A rounded stick, e.g. for fingers. */
const capsule = (radius: number, length: number) => new THREE.CapsuleGeometry(radius, length, 4, 10);

const group = (position: [number, number, number] = [0, 0, 0], ...children: Array<THREE.Object3D>) => {
	const g = new THREE.Group();
	g.position.set(...position);
	children.forEach((c) => g.add(c));
	return g;
};

// ---------------------------------------------------------------- body parts

const buildHand = (side: number) => {
	// relaxed hand: palm faces the thigh (towards the body), thumb in front
	const hand = new THREE.Group();
	const inward = -side;
	hand.add(mesh(ball(0.04), C.skin, { position: [0, -0.042, 0], scale: [0.36, 1.05, 0.85] }));
	const lengths = [0.05, 0.056, 0.053, 0.042]; // index (front) to little finger (back)
	lengths.forEach((length, i) => {
		hand.add(
			mesh(capsule(0.0078, length), C.skin, {
				position: [inward * 0.004, -0.088 - length / 2, 0.023 - i * 0.0155],
				rotation: [0, 0, inward * -0.2]
			})
		);
	});
	hand.add(
		mesh(capsule(0.0088, 0.036), C.skin, {
			position: [inward * 0.01, -0.05, 0.038],
			rotation: [-0.6, 0, inward * -0.25]
		})
	);
	return hand;
};

const buildArm = (side: number, shoulderY: number) => {
	const U = 0.29;
	const F = 0.26;
	const shoulder = group([side * 0.172, shoulderY, 0]);
	const elbow = group([0, -U, 0]);
	const wrist = group([0, -F, 0]);

	{
		shoulder.add(
			mesh(
				lathe([
					[0, -U - 0.01],
					[0.039, -U],
					[0.047, -U * 0.6],
					[0.05, -0.1],
					[0.046, -0.04],
					[0, -0.02]
				]),
				C.skin
			)
		);
		// short sleeve
		shoulder.add(
			mesh(
				lathe([
					[0.064, -0.15],
					[0.07, -0.07],
					[0.072, -0.01],
					[0.064, 0.03],
					[0.04, 0.05]
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
	}

	elbow.add(mesh(ball(0.043), C.skin));

	const hand = buildHand(side);
	hand.scale.setScalar(1.12);
	wrist.add(hand);
	elbow.add(wrist);
	shoulder.add(elbow);
	return { shoulder, elbow, wrist, side };
};

const buildLegs = (color: string) => {
	const legs = new THREE.Group();
	// pelvis / waistband the legs grow out of
	legs.add(
		mesh(
			lathe(
				[
					[0, 0.74],
					[0.15, 0.745],
					[0.16, 0.83],
					[0.162, 0.9],
					[0.14, 0.94],
					[0, 0.945]
				],
				10
			),
			color,
			{ scale: [1, 1, 0.62] }
		)
	);
	for (const side of [-1, 1]) {
		const leg = mesh(
			lathe([
				[0, 0.06],
				[0.079, 0.062],
				[0.081, 0.2],
				[0.083, 0.4],
				[0.087, 0.6],
				[0.093, 0.77],
				[0.06, 0.83],
				[0, 0.84]
			]),
			color,
			{ position: [side * 0.1, 0, 0], rotation: [0, 0, side * 0.035] }
		);
		legs.add(leg);

		const shoe = group([side * 0.12, 0, 0.065]);
		shoe.rotation.y = side * 0.18;
		shoe.add(mesh(ball(0.07), C.shoe, { position: [0, 0.05, 0], scale: [0.85, 0.6, 2.25] }));
		shoe.add(mesh(ball(0.07), C.sole, { position: [0, 0.018, 0], scale: [0.9, 0.22, 2.35] }));
		for (let i = 0; i < 3; i++) {
			shoe.add(
				mesh(new THREE.BoxGeometry(0.004, 0.05, 0.012), C.stripe, {
					position: [side * 0.059, 0.05, 0.0 + i * 0.026],
					rotation: [0.5, 0, 0]
				})
			);
		}
		legs.add(shoe);
	}
	return legs;
};

const buildTorso = () => {
	const torso = new THREE.Group();
	const grow = 0;
	const color = C.tee;
	const body = mesh(
		lathe(
			[
				[0.182 + grow, -0.03],
				[0.178 + grow, 0.03],
				[0.162 + grow, 0.2],
				[0.18 + grow, 0.34],
				[0.205 + grow, 0.44],
				[0.212 + grow, 0.49],
				[0.18 + grow, 0.54],
				[0.07, 0.568],
				[0, 0.572]
			],
			10
		),
		color,
		{ scale: [1, 1, 0.6], double: true }
	);
	torso.add(body);

	return torso;
};

const SKULL: Array<[number, number]> = [
	[0, -0.135],
	[0.045, -0.13],
	[0.082, -0.095],
	[0.1, -0.035],
	[0.106, 0.04],
	[0.1, 0.1],
	[0.076, 0.145],
	[0.035, 0.165],
	[0, 0.168]
];
const SKULL_DEPTH = 1.08;

/**
 * Hair as one shell that follows the skull and ends on a continuous hairline
 * around the head: high at the forehead, just above the ears, lower at the back.
 */
const buildHairShell = () => {
	const thickness = 0.01;
	const profile = new THREE.SplineCurve(SKULL.map(([r, y]) => new THREE.Vector2(r, y))).getPoints(80);
	const radiusAt = (y: number) => {
		// skull radius at height y (upper half of the profile)
		for (let i = profile.length - 1; i > 0; i--) {
			const a = profile[i];
			const b = profile[i - 1];
			if (y <= a.y && y >= b.y) {
				const t = (y - b.y) / (a.y - b.y || 1);
				return b.x + (a.x - b.x) * t;
			}
		}
		return profile[0].x;
	};

	const outer = profile
		.filter((p) => p.y > -0.07)
		.map((p) => new THREE.Vector2(Math.max(0, p.x) + thickness, p.y + (p.x < 0.02 ? thickness : 0)));
	const geometry = new THREE.LatheGeometry(outer, 48);

	// hairline height around the head (angle 0 = front)
	const hairline = (angle: number) => {
		const front = (Math.cos(angle) + 1) / 2;
		return -0.045 + 0.15 * Math.pow(front, 1.8);
	};

	const pos = geometry.attributes.position;
	for (let i = 0; i < pos.count; i++) {
		const x = pos.getX(i);
		const y = pos.getY(i);
		const z = pos.getZ(i);
		const angle = Math.atan2(x, z);
		const line = hairline(angle);
		if (y < line) {
			// fold everything below the hairline onto it, hugging the skull
			const r = radiusAt(line) + thickness * 0.4;
			pos.setXYZ(i, Math.sin(angle) * r, line, Math.cos(angle) * r);
		}
	}
	geometry.computeVertexNormals();
	return geometry;
};

const buildHead = () => {
	const head = new THREE.Group();

	// skull and jaw, a bit deeper than wide
	head.add(mesh(lathe(SKULL), C.skin, { scale: [1, 1, SKULL_DEPTH] }));

	// ears that stick out a little
	for (const side of [-1, 1]) {
		head.add(
			mesh(ball(0.03), C.skinShade, {
				position: [side * 0.104, 0.0, -0.005],
				scale: [0.42, 1.05, 0.72],
				rotation: [0, side * 0.45, 0]
			})
		);
	}

	// face: kept simple but strong enough to survive the blur as soft shadows
	head.add(mesh(ball(0.02), C.skinShade, { position: [0, -0.02, 0.106], scale: [0.75, 1.2, 0.95] }));
	for (const side of [-1, 1]) {
		// big comic eye: white, blue-grey iris, pupil and a highlight
		const eye = group([side * 0.041, 0.02, 0.098]);
		eye.rotation.y = side * 0.32;
		eye.add(mesh(ball(0.029), C.eyeWhite, { scale: [0.82, 1.08, 0.42] }));
		eye.add(mesh(ball(0.017), C.iris, { position: [side * -0.002, -0.003, 0.009], scale: [0.95, 1.05, 0.4] }));
		eye.add(mesh(ball(0.0095), C.pupil, { position: [side * -0.002, -0.003, 0.0135], scale: [1, 1.05, 0.4] }));
		eye.add(mesh(ball(0.0045), C.eyeWhite, { position: [side * -0.008, 0.007, 0.017] }));
		head.add(eye);

		head.add(
			mesh(capsule(0.0075, 0.032), C.brow, {
				position: [side * 0.042, 0.064, 0.101],
				rotation: [0, side * -0.32, Math.PI / 2 + side * 0.1]
			})
		);
	}
	head.add(mesh(capsule(0.007, 0.03), C.lips, { position: [0, -0.068, 0.096], rotation: [0, 0, Math.PI / 2] }));

	// hair: one continuous shell, plus a little volume on top at the front
	head.add(mesh(buildHairShell(), C.hair, { scale: [1, 1, SKULL_DEPTH], double: true }));
	head.add(
		mesh(ball(0.075), C.hair, {
			position: [0, 0.14, 0.03],
			rotation: [0.35, 0, 0],
			scale: [1.15, 0.5, 1.1]
		})
	);
	head.add(
		mesh(ball(0.05), C.hair, {
			position: [0, 0.15, 0.075],
			rotation: [0.6, 0, 0],
			scale: [1.5, 0.5, 0.85]
		})
	);

	return head;
};

// ------------------------------------------------------------------ figures

export const buildAvatar = (): Avatar => {
	const root = new THREE.Group();
	const figure = new THREE.Group();
	root.add(figure);

	figure.add(buildLegs(C.jeans));

	const hipY = 0.9;
	const torso = group([0, hipY, 0], buildTorso());
	figure.add(torso);

	const shoulderY = 0.5;
	const arms = [-1, 1].map((side) => buildArm(side, shoulderY));
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

	const head = buildHead();
	head.scale.setScalar(1.18);
	head.position.set(0, 0.79, 0.005);
	torso.add(head);

	// relaxed: arms hang loosely at the sides, elbows barely bent,
	// palms towards the thighs
	for (const arm of arms) {
		const s = arm.side;
		arm.shoulder.rotation.set(0.03, 0, s * 0.15);
		arm.elbow.rotation.set(-0.16, 0, s * 0.04);
		arm.wrist.rotation.set(0, s * 0.15, s * -0.04);
	}

	const height = 1.86;
	figure.position.y = -height / 2;
	return { root, torso, head, arms, height };
};
