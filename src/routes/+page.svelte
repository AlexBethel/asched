<script lang="ts">
    import { selections } from '$lib/storage/selections';

    let semester_selection: string;
    function goto_semester() {
        // Clear the courses, and proceed to the main schedule selection.
        selections.set([]);
        window.location.href = semester_selection;
    }

    const options: {
        name: string;
        url: string;
    }[] = [
        { name: 'Spring 2024', url: '/sched/2024/spr' },
        { name: 'Fall 2023', url: '/sched/2023/fal' }
    ];
</script>

<article class="container">
    <h1>🫖 Teaweb</h1>

    <p>Welcome to the Teaweb NMT Scheduler, a successor to Beanweb.</p>

    <form on:submit={goto_semester}>
        <select required bind:value={semester_selection}>
            <option value="" disabled selected>Choose a semester...</option>
            {#each options as option}
                <option value={option.url}>{option.name}</option>
            {/each}
        </select>
        <input type="submit" value="Create a schedule" />
    </form>

    Made by Alexander Bethel &bullet;
    <a href="https://github.com/alexbethel/teaweb">Source code</a>
    &bullet;
    <a href="https://discord.gg/6n5VTKnTha">Discord server</a>
</article>

<style>
    article {
        margin-top: 20vh;
        padding: 30px;
    }

    h1 {
        text-align: center;
    }
</style>
