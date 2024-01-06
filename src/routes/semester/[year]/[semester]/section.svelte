<!-- Component to render a single section. -->
<script lang="ts">
	import type { ClassSection } from '$lib/data_types.ts';
	import { categorize } from '$lib/categories';
	import Meeting from './meeting.svelte';

	export let course: string;
	export let classtimes: ClassSection[];

	const classtime = classtimes[0];

	import { selected } from './stores';
	let checked: boolean;

	function update_check() {
		const checking = !checked;
		if (checking) {
			selected.update((s) => {
				s.push(classtime);
				return s;
			});
		} else {
			selected.update((s) => s.filter((el) => el !== classtime));
		}
	}

	import translation from './translation.json';
	const instructor = translation.instructors[classtime.instructor] || classtime.instructor;
</script>

<div class="flow">
	<input type="checkbox" role="switch" bind:checked on:click={update_check} />
	<div>
		<strong>{course}-{classtime.section_number}</strong>
		<br />
		<strong>Instructor:</strong>
		<a href="/instructor/{instructor}">{instructor}</a>
		<br />
		<strong>Seats:</strong>
		{classtime.seats}/{classtime.limit}
		{#if classtime.seats == 0}
			<span class="warning">(Full)</span>
		{/if}
		<ul>
			{#each classtime.meetings as meeting}
				<li>
					<Meeting
						day={meeting.day}
						start_time={meeting.start_time}
						end_time={meeting.end_time}
						{meeting}
					></Meeting>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	/* bit of a hack, but I'm using a flexbox to position the switch
    right next to the paragraph. The switch needs manual adjustment to
    make it line up. */
	div.flow {
		display: flex;
	}
	input {
		translate: 0px 7px;
		margin-left: 10px;
		margin-right: 20px;
	}
	.warning {
		color: red;
		font-weight: bold;
	}
	ul {
		/* push the ul a little to the right, just to make it easier to
        scan your eyes through the list of classes. */
		margin-left: 10px;
	}
</style>
