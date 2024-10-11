import { regex } from "regex";
export function escapeRegex(value) {
    return regex `${value}`.source;
}
