// Functions for making local storage slots into Svelte stores.

import { writable, type Writable } from 'svelte/store';

export function make_storage<T>(
    name: string,
    encode: (value: T) => string,
    decode: (raw: string) => T,
    default_value: T
): Writable<T> {
    let initial = default_value;
    const initial_str = typeof window !== 'undefined' && window.localStorage.getItem(name);
    if (initial_str) initial = decode(initial_str) ?? default_value;

    const store = writable(initial);
    store.subscribe((value) => {
        if (typeof window !== 'undefined') window.localStorage.setItem(name, encode(value));
    });

    return store;
}

export function make_str_storage(name: string, default_value: string): Writable<string> {
    return make_storage(
        name,
        (x) => x,
        (x) => x,
        default_value
    );
}
