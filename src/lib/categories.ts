// Categorization for classes.

function categorize<T, U>(
    items: T[],
    by: (item: T) => U,
    group: (a: U, b: U) => boolean = (a, b) => a === b
): { label: U; items: T[] }[] {
    const labels: U[] = [];
    for (const label of items.map(by)) if (!labels.find((c) => group(c, label))) labels.push(label);
    labels.sort();

    const result: { label: U; items: T[] }[] = [];
    for (const label of labels)
        result.push({ label: label, items: items.filter((i) => group(label, by(i))) });
    return result;
}

function sort_by_key<T, U>(key: (t: T) => U, arr: T[]): T[] {
    arr.sort((a, b) => {
        const ka = key(a);
        const kb = key(b);
        switch (true) {
            case ka < kb:
                return -1;
            case ka > kb:
                return 1;
            default:
                return 0;
        }
    });
    return arr;
}

export { categorize, sort_by_key };
