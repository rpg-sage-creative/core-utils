import { wrapRegex } from "./wrapRegex.js";
export function spoilerRegex(regexp, spoilers) {
    return wrapRegex(regexp, "||||", spoilers);
}
