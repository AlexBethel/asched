// A simple engine for translating strings from Banweb's abbreviations
// into English.

export class Translator {
    private replacements: [RegExp, string][];
    private blacklist: RegExp[];

    // Creates a new Translator. `replacements` are applied in order
    // to every input string, unless the string matches any element of
    // `blacklist`.
    public constructor(replacements: [RegExp, string][], blacklist: RegExp[] = []) {
        this.replacements = replacements;
        this.blacklist = blacklist;
    }

    public translate(input: string): string {
        for (const bl of this.blacklist) {
            if (input.match(bl)) return input;
        }

        for (const [from, to] of this.replacements) input = input.replace(from, to);
        return input;
    }
}
