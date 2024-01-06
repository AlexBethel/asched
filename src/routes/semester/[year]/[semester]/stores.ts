// Global stores for the scheduling page.

import type { ClassSection } from '$lib/data_types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

// Currently selected classes.
const selected: Writable<ClassSection[]> = writable([]);

export { selected };
