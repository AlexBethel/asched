<!-- Component to render a single section. -->
<script lang="ts">
    import type { ClassSection } from '$lib/data_types.ts';
    import Meeting from './meeting.svelte';

    export let course: string;
    export let classtimes: ClassSection[];

    const classtime = classtimes[0];

    import { selections } from '$lib/storage/selections';

    let included = $selections.find((s) => s.crn == classtime.crn) !== undefined;
    let checked = included;
    $: {
        if (checked && !included) {
            selections.update((s) => {
                s.push(classtime);
                return s;
            });
        } else if (!checked && included) {
            selections.update((s) => s.filter((el) => el !== classtime));
        }
        included = checked;
    }

    import translationFile from './translation.json';
    const translation: {
        classes: {
            substitutions: { [k: string]: string };
            blacklist: string[];
        };
        instructors: { [name: string]: string };
    } = translationFile;
    const instructor = translation.instructors[classtime.instructor] || classtime.instructor;
</script>

<div class="flow">
    <input type="checkbox" role="switch" bind:checked />
    <div>
        <strong>
            {course}-{classtime.section_number}
        </strong>
        {#if classtime.course_fees != 0}
            <span class="money">
                (${classtime.course_fees})
            </span>
        {/if}
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
                    <Meeting {classtime} {meeting}></Meeting>
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
    .money {
        color: var(--secondary);
    }
    ul {
        /* push the ul a little to the right, just to make it easier to
        scan your eyes through the list of classes. */
        margin-left: 10px;
    }
</style>
