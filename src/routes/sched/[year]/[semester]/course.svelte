<!-- Component to render a single course. -->
<script lang="ts">
    import type { ClassSection } from '$lib/data_types.ts';
    import { categorize } from '$lib/categories';
    import Section from './section.svelte';
    import { translations } from '$lib/translation/course_names';
    import { fade } from 'svelte/transition';
    import { selections } from '$lib/storage/selections';

    export let course: string;
    export let classtimes: ClassSection[];

    const by_section = categorize(classtimes, (c) => c.section_number);

    const title = translations.translate(classtimes[0].title);

    $: selected = classtimes.find((ct) => $selections.find((sel) => sel.crn == ct.crn));
</script>

<details>
    <summary>
        {course}: {title}
        {#if selected}
            <span class="selection" transition:fade={{ duration: 100 }}> &bullet; </span>
        {/if}
    </summary>
    {#each by_section as section}
        <Section {course} classtimes={section.items}></Section>
    {/each}
</details>

<style>
    .selection {
        color: var(--primary);
    }
</style>
