import { isDefined } from "@rsc-utils/type-utils";
import { getDataConverter } from "./internal/getDataConverter.js";
import { sortPrimitive } from "./sortPrimitive.js";
export function sortAsPrimitive(dataType) {
    const dataConverter = getDataConverter(dataType);
    const valueConverter = (value) => isDefined(value) ? dataConverter(value) : value;
    return (a, b) => sortPrimitive(valueConverter(a), valueConverter(b));
}
