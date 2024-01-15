<script lang="ts">
    // Global CSS.
    import './pico.min.css';

    import { theme } from '$lib/storage/theme';

    $: {
        if (typeof document !== 'undefined')
            document.documentElement.setAttribute('data-theme', $theme);
    }
</script>

<header class="container-fluid">
    <nav>
        <ul>
            <li>
                <strong>
                    <!-- Presumably someday we'll get a logo; for now I'm
                         lazy and just using an emoji :P -->
                    🫖 Teaweb
                </strong>
            </li>
        </ul>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/my-schedule">My classes</a></li>
            <li>
                <details role="list" dir="rtl">
                    <summary role="link" aria-haspopup="listbox"> Theme </summary>
                    <ul role="listbox">
                        <li>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#" on:click={() => theme.set('')}>Auto</a>
                        </li>
                        <li>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#" on:click={() => theme.set('light')}>Light</a>
                        </li>
                        <li>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#" on:click={() => theme.set('dark')}>Dark</a>
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    </nav>
</header>
<slot />

<style>
    header {
        position: sticky;
        top: 0;
        background-color: var(--background-color);
        border-bottom: 1px solid var(--muted-border-color);
        z-index: 1; /* needed to avoid issues with arrows */
    }
</style>
