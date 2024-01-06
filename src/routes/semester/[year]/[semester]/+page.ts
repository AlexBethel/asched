import type { ClassSection } from '$lib/data_types.ts';

export async function load(event) {
	const classtimes = (await (await event.fetch('/classtimes.json')).json()) as ClassSection[];

	const semester: string = event.params.semester.substring(0, 3);
	const year = +event.params.year;
	return { classtimes, semester, year };
}

export const ssr = false;
