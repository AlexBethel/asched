// Local storage for class selections.

import { make_storage } from "$lib/make_storage";
import type { Writable } from "svelte/store";

// We'll store an array of CRNs as a JSON object, unless we need
// a more efficient representation.

export const selections: Writable<number[]> = make_storage(
    'selections',
    JSON.stringify,
    JSON.parse,
    [],
);
