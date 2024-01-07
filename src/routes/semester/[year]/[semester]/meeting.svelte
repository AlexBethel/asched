<!-- Component to render a meeting time. -->
<script lang="ts">
	import type { ClassSection, Meeting } from '$lib/data_types';
	import { sections_meeting_conflict } from '$lib/conflicts';
	import { fade } from 'svelte/transition';

	export let classtime: ClassSection;
	export let meeting: Meeting;

	const day = meeting.day;
	const start_time = meeting.start_time;
	const end_time = meeting.end_time;
	const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	const day_name = days[day];

	// start_time and end_time are given as e.g. "1345" for 1:45 p.m.
	function time_to_string(time: number): string {
		const hour = Math.floor(time / 100);
		const minute = time % 100;

		const disp_hour = ((hour + 11) % 12) + 1;

		// pad `minute` to have a leading zero if necessary.
		const minute_str = ('' + minute).padStart(2, '0');

		// TODO: Add a "settings" page, where the user can choose between
		// 12- and 24-hour time; can also move theme selection there.
		return `${disp_hour}:${minute_str} ${hour > 11 ? 'p.m.' : 'a.m.'}`;
	}

	import { selected } from './stores';
	$: conflicts = sections_meeting_conflict($selected, meeting, classtime);
	$: hasConflict = conflicts.length != 0;
</script>

<span style="min-width: 150px; display: inline-block">
	{day_name}:
</span>
<span style="min-width: 250px; display: inline-block">
	{time_to_string(start_time)}&ndash;{time_to_string(end_time)}
</span>
{#if hasConflict}
	<span class="warning" transition:fade={{ duration: 100 }}>
		{#if conflicts.length == 1}
			Conflict with
			{conflicts[0].subject}
			{conflicts[0].course_number}-{conflicts[0].section_number}
		{:else}
			Conflict with {conflicts.length} classes
		{/if}
	</span>
{/if}

<style>
	.warning {
		color: red;
		font-weight: bold;
	}
</style>
