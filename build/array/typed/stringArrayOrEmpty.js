import { stringOrUndefined } from "../../string/index.js";
import { isDefined } from "../../types/index.js";
export function stringArrayOrEmpty(value, opts) {
    const { splitter = ",", mapper = stringOrUndefined, filter = isDefined } = opts ?? {};
    return value?.split(splitter).map(mapper).filter(filter) ?? [];
}
