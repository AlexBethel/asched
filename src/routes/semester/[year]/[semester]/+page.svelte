<script lang="ts">
	export let data;

	import type { ClassSection } from '$lib/data_types';
	import { categorize } from '$lib/categories';
	import Subject from './subject.svelte';
	import { gunzipSync, strFromU8 } from 'fflate';

	type ClassSet = { label: string; items: ClassSection[] }[];
	async function load_classes(): Promise<ClassSet> {
		const classtimesD: ClassSection[] = JSON.parse(
			strFromU8(gunzipSync(new Uint8Array(await (await fetch('/classes.json.gz')).arrayBuffer())))
		);

		// Loading animation testing
		// await new Promise(resolve => setTimeout(resolve, 1000));

		const classtimes = classtimesD.filter(
			(cs) => cs.year === data.year && cs.semester.toLowerCase() === data.semester.toLowerCase()
		);
		const by_subject = categorize(classtimes, (c) => c.subject);
		return by_subject;
	}
</script>

<main class="container">
	<h2>Fall 2024</h2>
	{#await load_classes()}
		<h3>Loading classes...</h3>
		<progress></progress>
	{:then by_subject}
		{#each by_subject as subject}
			<Subject subject={subject.label} classtimes={subject.items}></Subject>
		{/each}
	{/await}
</main>

<style>
	h2 {
		margin-top: 50px;
		margin-bottom: 100px;
		text-align: center;
	}

	h3 {
		margin-top: 50px;
		text-align: center;
	}

	main {
		/* Extra scroll space. */
		margin-bottom: 200px;
	}
</style>
