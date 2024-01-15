// Local storage for class selections.

import type { ClassSection } from '$lib/data_types';
import { make_storage } from '$lib/make_storage';
import type { Writable } from 'svelte/store';

// We'll store an array of sections as a JSON object, unless we need a
// more efficient representation.

export const selections: Writable<ClassSection[]> = make_storage(
    'selections',
    JSON.stringify,
    JSON.parse,
    []
);
