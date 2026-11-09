import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

// the CV page moved to /lebenslauf; keep old links working
export const load = () => {
	redirect(308, `${base}/lebenslauf`);
};
