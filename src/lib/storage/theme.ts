// Local storage for the site theme.

import { writable } from 'svelte/store';

let initial_value = '';
if (typeof window !== 'undefined')
    initial_value = window.localStorage.getItem('theme') || initial_value;

export const theme = writable(initial_value);

theme.subscribe((value) => {
    if (typeof window !== 'undefined') window.localStorage.setItem('theme', value);
});
