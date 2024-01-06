<!-- Component to render a single course. -->
<script lang="ts">
	import type { ClassSection } from '$lib/data_types.ts';
	import { categorize } from '$lib/categories';
	import Section from './section.svelte';

	export let course: string;
	export let classtimes: ClassSection[];

	const title = classtimes[0].title;
	const by_section = categorize(classtimes, (c) => c.section_number);
</script>

<details>
	<summary>{course}: {title}</summary>
	{#each by_section as section}
		<Section {course} classtimes={section.items}></Section>
	{/each}
</details>
