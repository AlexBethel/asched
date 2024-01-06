<script lang="ts">
	export let data;

	import type { ClassSection } from '$lib/data_types';
	import { categorize } from '$lib/categories';
	import Subject from './subject.svelte';

	const classtimes = data.classtimes.filter(
		(cs) => cs.year === data.year && cs.semester.toLowerCase() === data.semester.toLowerCase()
	);
	const by_subject = categorize(classtimes, (c) => c.subject);
</script>

<main class="container">
	<h2>Fall 2024</h2>
	{#each by_subject as subject}
		<Subject subject={subject.label} classtimes={subject.items}></Subject>
	{/each}
</main>

<style>
	h2 {
		text-align: center;
	}

	main {
		/* Extra scroll space. */
		margin-bottom: 200px;
	}
</style>
