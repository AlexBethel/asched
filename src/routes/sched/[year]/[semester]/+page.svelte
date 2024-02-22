<script lang="ts">
    export let data;

    import type { ClassSection } from '$lib/data_types';
    import { categorize } from '$lib/categories';
    import Subject from './subject.svelte';
    import { gunzipSync, strFromU8 } from 'fflate';

    type ClassSet = { label: string; items: ClassSection[] }[];
    async function load_classes(): Promise<ClassSet> {
        const classtimesD: ClassSection[] = JSON.parse(
            strFromU8(
                gunzipSync(new Uint8Array(await (await fetch('/classes.json.gz')).arrayBuffer()))
            )
        );

        // Loading animation testing
        // await new Promise(resolve => setTimeout(resolve, 1000));

        const classtimes = classtimesD.filter(
            (cs) =>
                cs.year === data.year && cs.semester.toLowerCase() === data.semester.toLowerCase()
        );
        const by_subject = categorize(classtimes, (c) => c.subject);
        return by_subject;
    }

    let search_term = '';
    function filter_classes(term: string, classes: ClassSet): ClassSet {
        if (term === '') return classes;

        console.log(`filtering by ${term}`);
        return classes.map((c) => ({
            label: c.label,
            items: c.items.filter((cx) => cx.title.toLowerCase().includes(term.toLowerCase()))
        }));
    }
</script>

<svelte:head>
    <title>Teaweb &mdash; Spring 2024</title>
</svelte:head>

<main class="container">
    <h2>Spring 2024</h2>
    <input type="search" placeholder="Filter classes..." bind:value={search_term} />
    {#await load_classes()}
        <h3>Loading classes...</h3>
        <progress></progress>
    {:then by_subject}
        {#each filter_classes(search_term, by_subject) as subject}
            <Subject subject={subject.label} classtimes={subject.items}></Subject>
        {/each}
    {/await}
</main>

<footer class="container">
    Information source:
    <a href="https://banweb7.nmt.edu/pls/PROD/hwzkcrof.p_uncgslctcrsoff">
        https://banweb7.nmt.edu/pls/PROD/hwzkcrof.p_uncgslctcrsoff
    </a>
</footer>

<style>
    h2 {
        margin-top: 50px;
        margin-bottom: 20px;
        text-align: center;
    }

    input {
        margin-bottom: 100px;
    }

    h3 {
        margin-top: 50px;
        text-align: center;
    }

    footer {
        margin-top: 50px;

        /* Extra scroll space. */
        margin-bottom: 100px;
    }
</style>
