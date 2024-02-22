<script lang="ts">
    import { theme } from '$lib/storage/theme';
    import { selections } from '$lib/storage/selections';

    import { fade } from 'svelte/transition';

    import Fa from 'svelte-fa';
    import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

    $: {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', $theme);

            // <html data-theme=""> acts differently than <html> it
            // seems, so we have to explicitly delete the attribute some
            // of the time.
            if ($theme === '') document.documentElement.toggleAttribute('data-theme', false);
        }
    }

    $: canSave = $selections.length != 0;
    let saveDialogOpen = false;

    function save() {
        saveDialogOpen = true;
    }
</script>

<header class="container-fluid top-header">
    <nav>
        <ul>
            <li>
                <a href="/">
                    <strong>
                        <!-- Presumably someday we'll get a logo; for now I'm
                             lazy and just using an emoji :P -->
                        🫖 Teaweb
                    </strong>
                </a>
            </li>
        </ul>
        <ul>
            {#if canSave}
                <li transition:fade={{ duration: 100 }}>
                    <a href="#" role="button" class="outline" on:click={save}>
                        <Fa icon={faFloppyDisk} />
                        Save
                    </a>
                </li>
                <li transition:fade={{ duration: 100 }}>
                    <a href="/sched/2024/spr/weekly"> View schedule </a>
                </li>
            {/if}
            <li>
                <a href="/sched/2024/spr">Course catalog</a>
            </li>
        </ul>
    </nav>
</header>

<dialog open={saveDialogOpen}>
    <article>
        <header>
            <a href="#" aria-label="Close" class="close" on:click={() => (saveDialogOpen = false)}>
            </a>
            Save schedule
        </header>
        <!-- Your schedule has been saved to the server. You can access it by opening your browser to the
             Teaweb website, or by accessing this URL:
             <blockquote style="font-family: monospace">
             <a href="https://teaweb.us/schedule/7yi3XWr"> https://teaweb.us/schedule/7yi3XWr </a>
             </blockquote>
             Don't lose this link! You will need it to view or modify this schedule in the future! -->
        Schedule saving is unimplemented currently!
        <footer>
            <a href="#" role="button" on:click={() => (saveDialogOpen = false)}> Close </a>
        </footer>
    </article>
</dialog>

<slot />

<style>
    header.top-header {
        position: sticky;
        top: 0;
        background-color: var(--background-color);
        border-bottom: 1px solid var(--muted-border-color);
        z-index: 1; /* needed to avoid issues with arrows */
    }

    a[role='button'] {
        /* The default padding is 10px, but it makes the button just
        slightly too large to fit in the toolbar because of the extra
        1px border. Subtracting 1 pixel off makes it all fit together
        just right. */
        padding: 9px;
    }
</style>
