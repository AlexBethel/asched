// Local storage for the site theme.

import { make_str_storage } from '$lib/make_storage';
import type { Writable } from 'svelte/store';

export const theme: Writable<string> = make_str_storage('theme', '');
