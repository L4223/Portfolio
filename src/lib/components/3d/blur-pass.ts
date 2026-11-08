import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

/**
 * One direction of a separable Gaussian blur. Use two passes (horizontal and
 * vertical) for a full 2D blur. `sigma` is in CSS pixels.
 */
const GaussianShader = {
	uniforms: {
		tDiffuse: { value: null as THREE.Texture | null },
		direction: { value: new THREE.Vector2(1, 0) },
		resolution: { value: new THREE.Vector2(1, 1) },
		sigma: { value: 9 }
	},
	vertexShader: /* glsl */ `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	fragmentShader: /* glsl */ `
		uniform sampler2D tDiffuse;
		uniform vec2 direction;
		uniform vec2 resolution;
		uniform float sigma;
		varying vec2 vUv;

		void main() {
			vec2 texel = direction / resolution;
			float twoSigmaSq = 2.0 * sigma * sigma;
			vec4 sum = texture2D(tDiffuse, vUv);
			float total = 1.0;
			// sample pairs, using linear filtering to cover two texels per fetch
			for (int i = 1; i <= 64; i += 2) {
				float x = float(i);
				if (x > sigma * 3.0) break;
				float w1 = exp(-(x * x) / twoSigmaSq);
				float w2 = exp(-((x + 1.0) * (x + 1.0)) / twoSigmaSq);
				float w = w1 + w2;
				float offset = x + w2 / w;
				sum += texture2D(tDiffuse, vUv + texel * offset) * w;
				sum += texture2D(tDiffuse, vUv - texel * offset) * w;
				total += 2.0 * w;
			}
			gl_FragColor = sum / total;
		}
	`
};

export const createBlurPasses = () => {
	const horizontal = new ShaderPass(GaussianShader);
	const vertical = new ShaderPass(GaussianShader);
	vertical.uniforms.direction.value = new THREE.Vector2(0, 1);

	return {
		passes: [horizontal, vertical],
		/** size in device pixels, sigma in CSS pixels */
		update(width: number, height: number, sigma: number, pixelRatio: number) {
			for (const pass of [horizontal, vertical]) {
				pass.uniforms.resolution.value.set(width, height);
				pass.uniforms.sigma.value = sigma * pixelRatio;
			}
		}
	};
};
