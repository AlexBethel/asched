import type { PageLoad } from './$types';
import type { ClassSection } from '$lib/data_types';

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch('/classtimes.json');
	const item = (await res.json()) as ClassSection[];

	return { item };
};
