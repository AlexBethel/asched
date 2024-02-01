<!-- Component to render a single subject. -->
<script lang="ts">
    import type { ClassSection } from '$lib/data_types.ts';
    import { categorize } from '$lib/categories';
    import Course from './course.svelte';

    import { fade } from 'svelte/transition';
    import { selections } from '$lib/storage/selections';

    import { translations } from '$lib/translation/subject_names';

    export let subject: string;
    export let classtimes: ClassSection[];
    let open = false;

    $: by_number = categorize(classtimes, (c) => c.course_number);
    $: selected = classtimes.find((ct) => $selections.find((sel) => sel.crn == ct.crn));
</script>

{#if classtimes.length != 0}
    <details bind:open>
        <summary>
            {translations[subject]}
            ({subject})
            {#if selected}
                <span class="selection" transition:fade={{ duration: 100 }}> &bullet; </span>
            {/if}
        </summary>
        <!-- Even though the `details` hides the body for us, we also
             explicitly avoid rendering the inside of it because the
             invisible DOM manipulations get a bit expensive when
             we're dealing with hundreds or thousands of class
             sections; it's bad enough to cause a noticeable delay
             with the search feature when turning on and off rendering
             for all those sections. -->
        {#if open}
            <article>
                {#each by_number as course}
                    <Course course={subject + ' ' + course.label} classtimes={course.items}
                    ></Course>
                {/each}
            </article>
        {/if}
    </details>
{/if}

<style>
    .selection {
        color: var(--primary);
    }
</style>
