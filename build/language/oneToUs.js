import { ukToUS } from "./internal/ukToUS.js";
export function oneToUS(term) {
    return ukToUS(term) ?? term;
}
