export enum CharSets {
    NUMBERS = "0123456789",
    SLETTERS_BLETTERS_NUMBERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    HEX = "0123456789abcdef"
}

export function consistsOnlyOf(set: CharSets, str: string) {
    for (let x of str) {
        if (!set.includes(x)) return false;
    }
    return true;
}