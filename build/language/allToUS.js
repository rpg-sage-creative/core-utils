import { oneToUS } from "./oneToUs.js";
export function allToUS(terms) {
    return terms.map(oneToUS);
}
