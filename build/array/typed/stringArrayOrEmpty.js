import { isDefined } from "@rsc-utils/type-utils";
import { stringOrUndefined } from "../../string/index.js";
export function stringArrayOrEmpty(value, opts) {
    const { splitter = ",", mapper = stringOrUndefined, filter = isDefined } = opts ?? {};
    return value?.split(splitter).map(mapper).filter(filter) ?? [];
}
