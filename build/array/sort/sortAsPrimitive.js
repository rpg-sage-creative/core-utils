import { isDefined } from "@rsc-utils/type-utils";
import { getDataConverter } from "./internal/getDataConverter.js";
import { sortPrimitive } from "./sortPrimitive.js";
export function sortAsPrimitive(dataType) {
    // converts to the data type
    const dataConverter = getDataConverter(dataType);
    // allows null/undefined to not be converted, ex: "null" / "undefined"
    const valueConverter = (value) => isDefined(value) ? dataConverter(value) : value;
    // return final sorter
    return (a, b) => sortPrimitive(valueConverter(a), valueConverter(b));
}
