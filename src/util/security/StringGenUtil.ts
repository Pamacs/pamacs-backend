import { CharSets } from "./CharSets";

export function generateString(set: CharSets, len: number) {
    let res = "";
    for (let i = 0 ; i < len ; i++) {
        res += set.charAt(Math.floor(Math.random() * set.length));
    }
    return res;
}