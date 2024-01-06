<!-- Component to render a single subject. -->
<script lang="ts">
	import type { ClassSection } from '$lib/data_types.ts';
	import { categorize } from '$lib/categories';
	import Course from './course.svelte';

	export let subject: string;
	export let classtimes: ClassSection[];

	const by_number = categorize(classtimes, (c) => c.course_number);
</script>

<details>
	<summary>{subject}</summary>
	<article>
		{#each by_number as course}
			<Course course={subject + ' ' + course.label} classtimes={course.items}></Course>
		{/each}
	</article>
</details>
